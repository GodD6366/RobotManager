import * as React from 'react';
import DashboardLayout from '../client/components/Layout';
import RuleList from '../client/components/rule/index';

export default function MainPage() {
  return (
    <DashboardLayout>
      <RuleList />
    </DashboardLayout>
  );
}
