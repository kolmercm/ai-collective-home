// src/app/page.tsx

import React from 'react';

interface Tenant {
  id: number;
  name: string;
  created_at: string;
  updated_at?: string;
  tenant_id: string;
  tenant_url: string;
  description?: string;
  company_name?: string;
  industry_type?: string;
}
interface TenantResponse {
  tenants: Tenant[];
}

async function getTenants(): Promise<TenantResponse> {
    const response = await fetch('https://api.ai-collective.xyz/tenants/', {
        next: {
            revalidate: 60,
        }
    });
    return response.json();
}

const Home = async () => {
    const apps = await getTenants();
    const getLink = (tenant_url: string) => {
        return `https://${tenant_url}.ai-collective.xyz`;
    }
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Apps Library</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.tenants.map(app => (
                    <div key={app.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">{app.name}</h2>
                        <p className="text-gray-600 mb-2">{app.description || 'No description available'}</p>
                        <p className="text-sm text-gray-500 mb-1"><span className="font-medium">Company:</span> {app.company_name || 'N/A'}</p>
                        <p className="text-sm text-gray-500 mb-1"><span className="font-medium">Industry:</span> {app.industry_type || 'N/A'}</p>
                        <p className="text-sm text-gray-500 mb-1"><span className="font-medium">Tenant ID:</span> {app.tenant_id}</p>
                        <p className="text-sm text-gray-500 mb-1"><span className="font-medium">Created:</span> {new Date(app.created_at).toLocaleDateString()}</p>
                        {app.updated_at && (
                            <p className="text-sm text-gray-500 mb-1"><span className="font-medium">Updated:</span> {new Date(app.updated_at).toLocaleDateString()}</p>
                        )}
                        <a href={getLink(app.tenant_url)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                            Visit App
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
