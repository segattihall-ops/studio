import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const { accessToken, newPassword } = await request.json();

    if (!accessToken || !newPassword) {
      return NextResponse.json(
        { error: { message: 'Token e nova senha são obrigatórios' } },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: { message: 'A senha deve ter pelo menos 8 caracteres' } },
        { status: 400 }
      );
    }

    // Verificar se o token é válido
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);

    if (userError || !userData.user) {
      return NextResponse.json(
        { error: { message: 'Token inválido ou expirado' } },
        { status: 401 }
      );
    }

    // Atualizar a senha usando o Supabase Admin
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      userData.user.id,
      { password: newPassword }
    );

    if (updateError) {
      console.error('[reset-password] Error updating password:', updateError);
      return NextResponse.json(
        { error: { message: 'Erro ao atualizar senha' } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Senha atualizada com sucesso',
    });
  } catch (error) {
    console.error('[reset-password] Unexpected error:', error);
    return NextResponse.json(
      { error: { message: 'Erro inesperado ao processar solicitação' } },
      { status: 500 }
    );
  }
}
