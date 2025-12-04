'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Image as ImageIcon, FileText as ArticleIcon } from 'lucide-react';
import { articlesData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {PlaceHolderImages} from '@/lib/placeholder-images';

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'outline' | 'destructive' } = {
  'Published': 'default',
  'Draft': 'secondary',
  'Review': 'outline',
};

const ContentPage = () => {
  return (
    <Tabs defaultValue="articles" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="articles"><ArticleIcon className="w-4 h-4 mr-2" /> Articles</TabsTrigger>
          <TabsTrigger value="images"><ImageIcon className="w-4 h-4 mr-2" /> Images</TabsTrigger>
        </TabsList>
        <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Content
        </Button>
      </div>

      <TabsContent value="articles">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Article Management</CardTitle>
                <CardDescription>Manage your articles and blog posts.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articlesData.map((article) => (
                        <TableRow key={article.id}>
                            <TableCell className="font-medium">{article.title}</TableCell>
                            <TableCell>{article.author}</TableCell>
                            <TableCell>{article.date}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariantMap[article.status] || 'outline'}>
                                    {article.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>View</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="images">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Image Library</CardTitle>
                <CardDescription>Manage your image assets.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {PlaceHolderImages.map((img) => (
                        <Card key={img.id} className="overflow-hidden group">
                           <div className="relative aspect-square">
                                <Image src={img.imageUrl} alt={img.description} fill className="object-cover transition-transform group-hover:scale-105" data-ai-hint={img.imageHint} />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                <div className="absolute top-2 right-2">
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="secondary" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                           </div>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ContentPage;
