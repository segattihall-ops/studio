'use client';
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { MoreHorizontal, PlusCircle, File, Search, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const therapistsData = [
  { id: 'thr001', name: 'Dr. Evelyn Reed', specialty: 'Deep Tissue', status: 'Active', location: 'New York, USA' },
  { id: 'thr002', name: 'Leo Carter', specialty: 'Swedish Massage', status: 'Pending', location: 'London, UK' },
  { id: 'thr003', name: 'Mia Chen', specialty: 'Hot Stone', status: 'Inactive', location: 'Tokyo, Japan' },
  { id: 'thr004', name: 'John Doe', specialty: 'Shiatsu', status: 'Active', location: 'San Francisco, USA' },
];

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  'Active': 'default',
  'Pending': 'secondary',
  'Inactive': 'destructive',
};

const TherapistsPage = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="font-headline">Gestão de Terapeutas</CardTitle>
              <CardDescription>Gerencie perfis, status e informações de terapeutas.</CardDescription>
            </div>
            <Button size="sm" onClick={() => setIsSheetOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Terapeuta
            </Button>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar terapeutas..." className="pl-8" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-1">
                  Status <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Todos</DropdownMenuItem>
                <DropdownMenuItem>Active</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>Inactive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline">
              <File className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Ações</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {therapistsData.map((therapist) => (
                <TableRow key={therapist.id}>
                  <TableCell className="font-medium">{therapist.name}</TableCell>
                  <TableCell>{therapist.specialty}</TableCell>
                  <TableCell>{therapist.location}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[therapist.status]}>
                      {therapist.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Desativar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar Novo Terapeuta</SheetTitle>
            <SheetDescription>Preencha os detalhes para adicionar um novo terapeuta.</SheetDescription>
          </SheetHeader>
          <div className="p-4">
             {/* Form fields go here */}
             <p className="text-center text-muted-foreground">Formulário de adição de terapeuta em breve.</p>
          </div>
          <SheetFooter>
            <Button>Salvar</Button>
            <SheetClose asChild>
              <Button variant="outline">Cancelar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TherapistsPage;
