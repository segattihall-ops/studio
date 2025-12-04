'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

const SeoPage = () => {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">SEO Booster</CardTitle>
                    <CardDescription>Optimize your website's search engine ranking.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="meta-title">Meta Title</Label>
                            <Input id="meta-title" defaultValue="Admin View - The Ultimate Dashboard" />
                            <p className="text-sm text-muted-foreground">The title that appears in search engine results and browser tabs.</p>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="meta-description">Meta Description</Label>
                            <Textarea id="meta-description" rows={3} defaultValue="Manage your application with ease using our powerful and intuitive admin dashboard." />
                            <p className="text-sm text-muted-foreground">A brief summary of your page's content, used by search engines.</p>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="keywords">Keywords</Label>
                            <Input id="keywords" defaultValue="admin, dashboard, management, analytics, user profiles" />
                             <p className="text-sm text-muted-foreground">Comma-separated keywords relevant to your site.</p>
                        </div>
                         <div className="grid gap-3">
                            <Label htmlFor="sitemap">Sitemap URL</Label>
                            <Input id="sitemap" defaultValue="https://example.com/sitemap.xml" />
                             <p className="text-sm text-muted-foreground">The URL to your website's sitemap.</p>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SeoPage;
