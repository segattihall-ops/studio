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
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const logsData = [
  { id: 1, level: 'ERROR', message: 'Failed to process payment for user: usr_123', timestamp: '2024-07-21 15:00:12', service: 'Billing' },
  { id: 2, level: 'INFO', message: 'User usr_456 logged in successfully', timestamp: '2024-07-21 14:55:03', service: 'Auth' },
  { id: 3, level: 'WARN', message: 'API rate limit approaching for endpoint /api/therapists', timestamp: '2024-07-21 14:50:21', service: 'API' },
  { id: 4, level: 'DEBUG', message: 'Running query for therapists in NY', timestamp: '2024-07-21 14:45:10', service: 'Database' },
];

const levelVariantMap: { [key: string]: 'destructive' | 'default' | 'secondary' | 'outline' } = {
  'ERROR': 'destructive',
  'INFO': 'default',
  'WARN': 'secondary',
  'DEBUG': 'outline',
};

const LogsPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Logs e Monitoramento do Sistema</CardTitle>
        <CardDescription>Monitore logs do sistema em tempo real e filtre por serviço ou nível.</CardDescription>
        <div className="flex items-center gap-2 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar logs..." className="pl-8" />
            </div>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos os Níveis</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                </SelectContent>
            </Select>
             <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Serviço" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos os Serviços</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="auth">Auth</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nível</TableHead>
              <TableHead>Mensagem</TableHead>
              <TableHead className="w-[180px]">Serviço</TableHead>
              <TableHead className="w-[200px]">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logsData.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <Badge variant={levelVariantMap[log.level]}>{log.level}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{log.message}</TableCell>
                 <TableCell>{log.service}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LogsPage;
