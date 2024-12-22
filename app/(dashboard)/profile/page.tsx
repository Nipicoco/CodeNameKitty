'use client';

import { ProfileForm } from '@/components/profile/profile-form';
import { SecuritySettings } from '@/components/profile/security-settings';
import { NotificationSettings } from '@/components/profile/notification-settings';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card className="p-6">
            <ProfileForm />
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card className="p-6">
            <SecuritySettings />
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card className="p-6">
            <NotificationSettings />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}