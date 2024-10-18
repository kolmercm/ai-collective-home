// "use client";

// import { useState } from "react";
// import { useRouter } from 'next/navigation';

// const NewTenantForm = ({onSubmit}: {onSubmit: (tenantName: string) => void}) => {
//     // form state
//     const [tenantName, setTenantName] = useState("");
//     const router = useRouter();

//     const handleCreateTenant = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const formData = new FormData(event.currentTarget);
//         const tenantNameInput = formData.get("tenantName") as string;
        
//         if (tenantNameInput) {
//             await onSubmit(tenantNameInput);
//             // Refresh the tenant list to include the new tenant
//             router.refresh();
//             // Optionally, reset the form
//             setTenantName("");
//         }
//     };

//     return (
//         <form onSubmit={handleCreateTenant} className="mb-4">
//             <input
//                 type="text"
//                 name="tenantName"
//                 value={tenantName}
//                 onChange={(e) => setTenantName(e.target.value)}
//                 placeholder="Enter tenant name"
//                 required
//                 className="mr-2 p-2 border border-gray-300 rounded"
//             />
//             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                 Submit
//             </button>
//         </form>
//     );
// };

// export default NewTenantForm;
    
    
