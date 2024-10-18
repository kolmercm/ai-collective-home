"use client";

import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// Define the validation schema using Zod
const tenantSchema = z.object({
  tenantName: z.string().min(1, "Tenant name is required"),
  description: z.string().optional(),
  tenantId: z.string().min(1, "Tenant ID is required"),
});

// Infer the form data type from the schema
type TenantFormData = z.infer<typeof tenantSchema>;

export default function GlobalNavbar() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
  });

  // Watch the tenantName field to auto-generate tenantId
  const tenantName = watch("tenantName");

  useEffect(() => {
    if (tenantName) {
      const generatedId = tenantName.toLowerCase().replace(/\s+/g, "-");
      setValue("tenantId", generatedId);
    }
  }, [tenantName, setValue]);

  // Handle form submission
  const onSubmit = async (data: TenantFormData) => {
    if (loading) return
    setLoading(true)
    try {
      const response = await fetch("https://api.ai-collective.xyz/tenants/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.tenantName,
          description: data.description,
          tenant_id: data.tenantId,
          tenant_url: data.tenantId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create tenant");
      }

      // Refresh the tenant list to include the new tenant
      router.refresh();

      // Close the dialog
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create tenant",
        variant: "destructive",
      });
      setOpen(false);
      // Optionally, display an error message to the user
    } finally {
      setLoading(false)
    }
  };

  return (
    <nav className="bg-background p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Collective</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create New Tenant</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Tenant</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="tenantName">Tenant Name</Label>
                <Input
                  id="tenantName"
                  {...register("tenantName")}
                  placeholder="Enter tenant name"
                  required
                />
                {errors.tenantName && (
                  <span className="text-red-500 text-sm">
                    {errors.tenantName.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  {...register("description")}
                  placeholder="Enter description"
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="tenantId">Tenant ID</Label>
                <Input
                  id="tenantId"
                  {...register("tenantId")}
                  placeholder="Enter tenant ID"
                  required
                />
                {errors.tenantId && (
                  <span className="text-red-500 text-sm">
                    {errors.tenantId.message}
                  </span>
                )}
              </div>
              <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
}
