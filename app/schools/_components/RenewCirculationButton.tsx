"use client";

import { useRenewCirculation } from "@/app/stores/useRenewCirculation";
import { RefreshCw } from "lucide-react";

const RenewCirculationButton = () => {
    const { open } = useRenewCirculation();
    return (
        <button onClick={() => open()} className="flex items-center px-4 py-2 rounded-lg bg-primary text-white shadow-md transition-all duration-300 ease-in-out hover:bg-primary/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50">
            <RefreshCw className="w-5 h-5" strokeWidth={1.5} />
            <span className="ml-2">Renew circulation</span>
        </button>
    )
}

export default RenewCirculationButton