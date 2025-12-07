import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: { message: 'Email é obrigatório' } },
        { status: 400 }
      );
    }

    // Verificar se o usuário existe
    const { data: user } = await supabaseAdmin.auth.admin.getUserByEmail(email);

    if (!user) {
      // Por segurança, não revelamos se o email existe ou não
      // Sempre retornamos sucesso para evitar enumeração de usuários
      return NextResponse.json({
        success: true,
        message: 'Se o email estiver cadastrado, você receberá instruções de recuperação.',
      });
    }

    // Verificar se é um admin válido
    const { data: adminRecord } = await supabaseAdmin
      .from('admins')
      .select('id, role')
      .eq('user_id', user.user.id)
      .maybeSingle();

    if (!adminRecord) {
      // Usuário existe mas não é admin - ainda retornamos sucesso por segurança
      return NextResponse.json({
        success: true,
        message: 'Se o email estiver cadastrado, você receberá instruções de recuperação.',
      });
    }

    // Enviar email de recuperação usando Supabase Auth
    const { error: resetError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        // URL de redirecionamento após clicar no link do email
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'}/reset-password`,
      },
    });

    if (resetError) {
      console.error('[forgot-password] Error generating reset link:', resetError);
      return NextResponse.json(
        { error: { message: 'Erro ao gerar link de recuperação.' } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email de recuperação enviado com sucesso.',
    });
  } catch (error) {
    console.error('[forgot-password] Unexpected error:', error);
    return NextResponse.json(
      { error: { message: 'Erro inesperado ao processar solicitação.' } },
      { status: 500 }
    );
  }
}
