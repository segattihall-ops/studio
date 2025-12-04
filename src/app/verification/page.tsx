'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Check, X, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const VerificationPage = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline">Fila de Verificação</CardTitle>
          <CardDescription>2 Terapeutas pendentes</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex flex-col gap-2">
                <Button variant="ghost" className="w-full justify-start bg-accent">
                    Joana Silva
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                    Carlos Pereira
                </Button>
           </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="h-7 w-7">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
            <div>
                <CardTitle className="font-headline">Verificar: Joana Silva</CardTitle>
                <CardDescription>Revise os documentos e aprove ou rejeite.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
                <h3 className="font-semibold mb-4">Checklist</h3>
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="id-check" defaultChecked />
                        <Label htmlFor="id-check">Verificação de identidade</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="license-check" />
                        <Label htmlFor="license-check">Verificação de licença</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="background-check" defaultChecked/>
                        <Label htmlFor="background-check">Verificação de antecedentes</Label>
                    </div>
                </div>
                 <div className="mt-6 flex gap-2">
                    <Button><Check className="mr-2 h-4 w-4" /> Aprovar</Button>
                    <Button variant="destructive"><X className="mr-2 h-4 w-4" /> Rejeitar</Button>
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-4">Visualizador de Documentos</h3>
                <Card className="h-[400px]">
                    <CardHeader className="flex flex-row items-center justify-between p-2 border-b">
                        <p className="text-sm font-medium">licenca_massagem.pdf</p>
                        <FileText className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <ScrollArea className="h-[340px]">
                        <CardContent className="p-4">
                           <p className="text-sm text-center text-muted-foreground py-20">Visualizador de PDF em breve.</p>
                        </CardContent>
                    </ScrollArea>
                </Card>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPage;
