"use client";

import React from "react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-card";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, PieChart, ArrowUpRight, Users, Calendar, Activity, TrendingUp } from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="container py-8">
      <header className="mb-10">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2 text-primary-gradient">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Welcome to your Dynamic Depth dashboard. This modern interface features vibrant gradients, 
          layered cards, and interactive elements designed for optimal user experience.
        </p>
      </header>

      <BentoGrid cols={3} className="mb-8">
        {/* Analytics Summary Card */}
        <BentoCard
          title="Analytics Overview"
          gradient="primary"
          className="col-span-1 md:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">8,249</p>
              <p className="text-muted-foreground text-sm">Total visitors this month</p>
            </div>
            <Button size="sm" variant="outline" className="border-gradient-primary glow-on-hover">
              <TrendingUp className="h-4 w-4 mr-1" /> 24% Increase
            </Button>
          </div>
          
          <div className="h-48 w-full bg-background/50 rounded-lg flex items-center justify-center">
            <LineChart className="h-full w-full p-4 text-primary-500 opacity-80" />
          </div>
        </BentoCard>

        {/* User Stats Card */}
        <BentoCard 
          title="Active Users"
          shadow="lg"
          animation="pulse"
        >
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 mr-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,482</p>
                <p className="text-xs text-muted-foreground">Current active users</p>
              </div>
            </div>
            <div className="h-24 w-full bg-background/50 rounded-lg flex items-center justify-center">
              <BarChart className="h-full w-full p-2 text-primary-500 opacity-80" />
            </div>
          </div>
        </BentoCard>

        {/* Events Card */}
        <BentoCard
          title="Upcoming Events"
          gradient="secondary"
          className="col-span-1"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-border/30 pb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-secondary/10 mr-3">
                  <Calendar className="h-4 w-4 text-secondary" />
                </div>
                <p className="text-sm font-medium">Product Launch</p>
              </div>
              <p className="text-xs text-muted-foreground">Tomorrow</p>
            </div>
            
            <div className="flex items-center justify-between border-b border-border/30 pb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-secondary/10 mr-3">
                  <Calendar className="h-4 w-4 text-secondary" />
                </div>
                <p className="text-sm font-medium">Team Meeting</p>
              </div>
              <p className="text-xs text-muted-foreground">Jun 15</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-secondary/10 mr-3">
                  <Calendar className="h-4 w-4 text-secondary" />
                </div>
                <p className="text-sm font-medium">Quarterly Review</p>
              </div>
              <p className="text-xs text-muted-foreground">Jun 30</p>
            </div>
          </div>
        </BentoCard>

        {/* Performance Card */}
        <BentoCard
          title="System Performance"
          className="col-span-1"
          animation="float"
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm">CPU Usage</p>
              <p className="text-sm font-medium">24%</p>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary-gradient h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm">Memory</p>
              <p className="text-sm font-medium">61%</p>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-secondary-gradient h-2 rounded-full" style={{ width: '61%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm">Storage</p>
              <p className="text-sm font-medium">38%</p>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary-gradient h-2 rounded-full" style={{ width: '38%' }}></div>
            </div>
          </div>
        </BentoCard>
        
        {/* Conversion Rate Card */}
        <BentoCard 
          title="Conversion Rate"
          className="col-span-1"
          gradient="secondary"
        >
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold">12.8%</p>
            <div className="p-2 rounded-md bg-green-100 dark:bg-green-900/30">
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3">+2.4% from last month</p>
          <div className="h-24 w-full flex items-center justify-center">
            <PieChart className="h-full w-full p-2 text-secondary-500 opacity-80" />
          </div>
        </BentoCard>

        {/* Activity Feed Card */}
        <BentoCard 
          title="Recent Activity"
          className="col-span-1"
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Activity className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Database backup completed</p>
                <p className="text-xs text-muted-foreground">10 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <Activity className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium">3 new user registrations</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                <Activity className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">System update installed</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
}
