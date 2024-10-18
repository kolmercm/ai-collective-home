"use client";

import { useState } from "react";

const NewTenantForm = ({onSubmit}: {onSubmit: (tenantName: string) => void}) => {
    // form state
    const [tenantName, setTenantName] = useState("");

    const handleCreateTenant = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const tenantName = formData.get("tenantName") as string;
        
        if (tenantName) {
          const newApp = {
            name: tenantName,
          }
        //   };
        onSubmit(tenantName);
        }
      };

    return (
        <form onSubmit={handleCreateTenant}>
            <input type="text" value={tenantName} onChange={(e) => setTenantName(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default NewTenantForm;
    
    
