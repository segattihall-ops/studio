'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Globe, Code } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SeoPage = () => {
    return (
        <Tabs defaultValue="metadata">
            <CardHeader className="px-0">
                <CardTitle className="font-headline">Painel de Controle de SEO</CardTitle>
                <CardDescription>Otimize todo o seu site para os motores de busca.</CardDescription>
            </CardHeader>
            <TabsList className="mb-4">
                <TabsTrigger value="metadata">Editor de Metadados</TabsTrigger>
                <TabsTrigger value="sitemap">Ferramentas de Sitemap</TabsTrigger>
                <TabsTrigger value="json-ld">Prévia de JSON-LD</TabsTrigger>
            </TabsList>
            <TabsContent value="metadata">
                <Card>
                    <CardHeader>
                        <CardTitle>Metadados Globais</CardTitle>
                        <CardDescription>Defina os metadados padrão para todo o seu site.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="meta-title">Meta Title</Label>
                                <Input id="meta-title" defaultValue="MasseurMatch - Encontre seu massoterapeuta ideal" />
                                <p className="text-sm text-muted-foreground">O título que aparece nos resultados de busca e nas abas do navegador.</p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="meta-description">Meta Description</Label>
                                <Textarea id="meta-description" rows={3} defaultValue="O maior diretório de massoterapeutas. Encontre profissionais qualificados perto de você." />
                                <p className="text-sm text-muted-foreground">Um breve resumo do conteúdo da sua página, usado pelos motores de busca.</p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="keywords">Keywords</Label>
                                <Input id="keywords" defaultValue="massagem, massoterapeuta, terapia, bem-estar, relaxamento" />
                                <p className="text-sm text-muted-foreground">Palavras-chave relevantes para o seu site, separadas por vírgula.</p>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>
                            <Save className="mr-2 h-4 w-4" />
                            Salvar Alterações
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="sitemap">
                 <Card>
                    <CardHeader>
                        <CardTitle>Gerenciamento de Sitemap</CardTitle>
                        <CardDescription>Gerencie e visualize o sitemap do seu site.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                         <div className="grid gap-3">
                            <Label htmlFor="sitemap-url">URL do Sitemap</Label>
                            <div className="flex items-center gap-2">
                                <Input id="sitemap-url" defaultValue="https://www.masseurmatch.com/sitemap.xml" readOnly />
                                 <Button variant="outline">Copiar</Button>
                            </div>
                            <p className="text-sm text-muted-foreground">Use esta URL para enviar aos motores de busca como Google e Bing.</p>
                        </div>
                         <Button>
                            <Globe className="mr-2 h-4 w-4" />
                            Gerar Sitemap Novamente
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>
             <TabsContent value="json-ld">
                 <Card>
                    <CardHeader>
                        <CardTitle>Prévia de JSON-LD</CardTitle>
                        <CardDescription>Visualize como seus dados estruturados aparecerão nos resultados de busca.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="p-4 bg-muted rounded-lg">
                            <pre className="text-xs text-foreground whitespace-pre-wrap font-code">
{`{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MasseurMatch",
  "url": "https://www.masseurmatch.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.masseurmatch.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}`}
                            </pre>
                        </div>
                        <Button variant="outline">
                            <Code className="mr-2 h-4 w-4" />
                            Testar com a Ferramenta do Google
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
};

export default SeoPage;
