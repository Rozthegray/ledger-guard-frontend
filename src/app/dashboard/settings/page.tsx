"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // 🟢 Import Select
import { 
  Key, CreditCard, User, Copy, Save, Loader2, Plus, Globe
} from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showKey, setShowKey] = useState(false);

  // Consolidated State
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    api_key: "",
    settings: {
      notifications: { email: true, weekly_reports: false },
      security: { two_factor: false },
      preferences: { currency: "NGN" } // 🟢 Added Currency Preference
    },
    billing: {
        address: "",
        city: "",
        state: "",
        country: "Nigeria"
    }
  });

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/user/me");
        const data = res.data;
        
        setProfile({
          full_name: data.full_name || "",
          email: data.email || "",
          company_name: data.company_name || "",
          api_key: data.api_key || "No API Key",
          phone: data.settings?.profile?.phone || "",
          settings: {
            notifications: { 
                email: data.settings?.notifications?.email ?? true,
                weekly_reports: data.settings?.notifications?.weekly_reports ?? false
            },
            security: {
                two_factor: data.settings?.security?.two_factor ?? false
            },
            // 🟢 Load Currency Preference (Default to NGN)
            preferences: {
                currency: data.settings?.preferences?.currency || "NGN"
            }
          },
          billing: {
            address: data.settings?.billing?.address || "",
            city: data.settings?.billing?.city || "",
            state: data.settings?.billing?.state || "",
            country: data.settings?.billing?.country || "Nigeria"
          }
        });
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Save Data
  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/user/me", {
        full_name: profile.full_name,
        company_name: profile.company_name,
        phone: profile.phone,
        settings: {
            notifications: profile.settings.notifications,
            security: profile.settings.security,
            preferences: profile.settings.preferences, // 🟢 Save Currency
            billing: profile.billing 
        }
      });
      alert("✅ Settings saved successfully!");
      // Optional: Refresh page to apply currency globally if needed
      window.location.reload(); 
    } catch (err) {
      alert("❌ Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  // Helper for toggles
  const toggleSetting = (section: string, key: string) => {
    setProfile(prev => ({
        ...prev,
        settings: {
            ...prev.settings,
            // @ts-ignore
            [section]: { ...prev.settings[section], [key]: !prev.settings[section][key] }
        }
    }));
  };

  if (loading) return <div className="p-10 text-white flex justify-center"><Loader2 className="animate-spin mr-2"/> Loading settings...</div>;

  return (
    <div className="container mx-auto max-w-4xl pb-20 space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
            <h1 className="text-3xl font-bold text-white">Account Settings</h1>
            <p className="text-slate-400">Manage profile, billing, and security.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold">
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Info */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* 1. PERSONAL INFO */}
            <Card className="bg-[#1A1F26] border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2"><User className="h-5 w-5 text-blue-400"/> Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-300">Full Name</Label>
                            <Input 
                                value={profile.full_name} 
                                onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                                className="bg-[#0B0D10] border-white/10 text-white" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Phone Number</Label>
                            <Input 
                                value={profile.phone} 
                                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                className="bg-[#0B0D10] border-white/10 text-white" 
                                placeholder="+234..."
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-300">Email Address</Label>
                        <Input value={profile.email} disabled className="bg-[#0B0D10]/50 border-white/5 text-slate-500 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-300">Company Name</Label>
                        <Input 
                            value={profile.company_name} 
                            onChange={(e) => setProfile({...profile, company_name: e.target.value})}
                            className="bg-[#0B0D10] border-white/10 text-white" 
                        />
                    </div>
                </CardContent>
            </Card>

            {/* 2. BILLING & PAYMENT */}
            <Card className="bg-[#1A1F26] border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2"><CreditCard className="h-5 w-5 text-green-400"/> Billing & Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Payment Method Display */}
                    <div className="bg-[#0B0D10] p-4 rounded-xl border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-16 bg-white rounded flex items-center justify-center">
                                <span className="font-bold text-blue-800 italic">VISA</span>
                            </div>
                            <div>
                                <p className="text-white font-medium">Visa ending in 4242</p>
                                <p className="text-xs text-slate-500">Expires 12/28</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-[#B6FF3B] hover:text-[#a2ff00] hover:bg-white/5">
                            <Plus className="h-4 w-4 mr-1" /> Add New
                        </Button>
                    </div>

                    {/* Editable Address */}
                    <div className="space-y-4 pt-2 border-t border-white/5">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Billing Address</h4>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Street Address</Label>
                            <Input 
                                value={profile.billing.address} 
                                onChange={(e) => setProfile({...profile, billing: {...profile.billing, address: e.target.value}})}
                                className="bg-[#0B0D10] border-white/10 text-white" 
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">City</Label>
                                <Input 
                                    value={profile.billing.city} 
                                    onChange={(e) => setProfile({...profile, billing: {...profile.billing, city: e.target.value}})}
                                    className="bg-[#0B0D10] border-white/10 text-white" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">State</Label>
                                <Input 
                                    value={profile.billing.state} 
                                    onChange={(e) => setProfile({...profile, billing: {...profile.billing, state: e.target.value}})}
                                    className="bg-[#0B0D10] border-white/10 text-white" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Country</Label>
                                <Input 
                                    value={profile.billing.country} 
                                    onChange={(e) => setProfile({...profile, billing: {...profile.billing, country: e.target.value}})}
                                    className="bg-[#0B0D10] border-white/10 text-white" 
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* RIGHT COLUMN: Config & Security */}
        <div className="space-y-8">
            
            {/* 3. API KEY */}
            <Card className="bg-[#1A1F26] border-white/10">
                <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2"><Key className="h-4 w-4 text-purple-400"/> API Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-[#0B0D10] p-3 rounded border border-white/5">
                        <Label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1 block">Secret Key</Label>
                        <div className="flex gap-2">
                            <Input 
                                value={profile.api_key} 
                                readOnly 
                                type={showKey ? "text" : "password"}
                                className="bg-transparent border-none text-slate-300 font-mono text-sm p-0 h-auto focus-visible:ring-0 shadow-none"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setShowKey(!showKey)} className="flex-1 border-white/10 text-slate-300 h-8 text-xs">
                            {showKey ? "Hide" : "Reveal"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(profile.api_key)} className="border-white/10 text-slate-300 h-8">
                            <Copy className="h-3 w-3" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* 4. SETTINGS */}
            <Card className="bg-[#1A1F26] border-white/10">
                <CardHeader>
                    <CardTitle className="text-white text-lg">Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    
                    {/* 🟢 Currency Selection */}
                    <div className="space-y-2">
                        <Label className="text-slate-300 flex items-center gap-2">
                            <Globe className="h-3 w-3" /> Default Currency
                        </Label>
                        <Select 
                            value={profile.settings.preferences.currency} 
                            onValueChange={(val) => setProfile(prev => ({
                                ...prev, 
                                settings: { 
                                    ...prev.settings, 
                                    preferences: { ...prev.settings.preferences, currency: val } 
                                }
                            }))}
                        >
                            <SelectTrigger className="bg-[#0B0D10] border-white/10 text-white">
                                <SelectValue placeholder="Select Currency" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0B0D10] border-white/10 text-white">
                                <SelectItem value="NGN">₦ Naira (NGN)</SelectItem>
                                <SelectItem value="USD">$ Dollar (USD)</SelectItem>
                                <SelectItem value="EUR">€ Euro (EUR)</SelectItem>
                                <SelectItem value="GBP">£ Pound (GBP)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="h-px bg-white/5 my-4"></div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-slate-300">Email Alerts</Label>
                            <p className="text-[10px] text-slate-500">Receive audit results via email.</p>
                        </div>
                        <Switch 
                            checked={profile.settings.notifications.email} 
                            onCheckedChange={() => toggleSetting("notifications", "email")}
                            className="data-[state=checked]:bg-[#B6FF3B]" 
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-slate-300">Two-Factor Auth</Label>
                            <p className="text-[10px] text-slate-500">Add an extra layer of security.</p>
                        </div>
                        <Switch 
                            checked={profile.settings.security.two_factor}
                            onCheckedChange={() => toggleSetting("security", "two_factor")}
                        />
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}