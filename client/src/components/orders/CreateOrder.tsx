import { Plus } from "lucide-react";
import React from "react";

const CreateOrder = () => {
    return (
        <button className="absolute h-20 w-20 rounded-full bg-yellow-200 flex items-center justify-center bottom-1 right-1">
            <Plus size={30} />
        </button>
    );
};

export default CreateOrder;
