'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const tickets = [
  { id: 'TKT-001', subject: 'Problema de pagamento', user: 'user_123', status: 'Open', priority: 'High', agent: 'Admin' },
  { id: 'TKT-002', subject: 'Não consigo fazer login', user: 'user_456', status: 'In Progress', priority: 'Medium', agent: 'Support Team' },
  { id: 'TKT-003', subject: 'Como atualizo meu perfil?', user: 'user_789', status: 'Closed', priority: 'Low', agent: 'Admin' },
];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'outline' } = {
  'Open': 'default', 'In Progress': 'secondary', 'Closed': 'outline',
};
const priorityVariant: { [key: string]: 'destructive' | 'default' | 'secondary' } = {
  'High': 'destructive', 'Medium': 'default', 'Low': 'secondary',
};

const SupportPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Central de Suporte ao Usuário</CardTitle>
        <CardDescription>Gerencie tickets de suporte, atribua agentes e resolva problemas dos usuários.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assunto</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Agente</TableHead>
              <TableHead><span className="sr-only">Ações</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map(ticket => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.subject}</TableCell>
                <TableCell><span className="font-mono text-xs">{ticket.user}</span></TableCell>
                <TableCell><Badge variant={statusVariant[ticket.status]}>{ticket.status}</Badge></TableCell>
                <TableCell><Badge variant={priorityVariant[ticket.priority]}>{ticket.priority}</Badge></TableCell>
                <TableCell>{ticket.agent}</TableCell>
                <TableCell>
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Ticket</DropdownMenuItem>
                        <DropdownMenuItem>Atribuir Agente</DropdownMenuItem>
                         <DropdownMenuItem>Escalonar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SupportPage;
