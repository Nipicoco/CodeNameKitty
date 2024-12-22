'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { generateInviteCodes, getInviteCodes } from '@/lib/admin/admin-service';
import type { InviteCode } from '@/types';

export function AdminInviteCodes() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [codes, setCodes] = useState<InviteCode[]>([]);
  const [amount, setAmount] = useState(1);

  const handleGenerateCodes = async () => {
    try {
      setIsLoading(true);
      const newCodes = await generateInviteCodes(amount);
      setCodes([...newCodes, ...codes]);
      toast({
        title: 'Success',
        description: `Generated ${amount} new invite code(s)`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate invite codes',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          type="number"
          min="1"
          max="100"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="w-24"
        />
        <Button onClick={handleGenerateCodes} disabled={isLoading}>
          Generate Codes
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Used By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {codes.map((code) => (
            <TableRow key={code.id}>
              <TableCell className="font-mono">{code.code}</TableCell>
              <TableCell>{code.used ? 'Used' : 'Available'}</TableCell>
              <TableCell>{new Date(code.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{code.used_by || '-'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}