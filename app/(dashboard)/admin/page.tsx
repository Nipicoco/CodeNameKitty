'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { AdminInviteCodes } from './components/invite-codes';
import { AdminUserManagement } from './components/user-management';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users, invite codes, and system settings.
        </p>
      </div>
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="invites">Invite Codes</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card className="p-6">
            <AdminUserManagement />
          </Card>
        </TabsContent>
        <TabsContent value="invites">
          <Card className="p-6">
            <AdminInviteCodes />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}