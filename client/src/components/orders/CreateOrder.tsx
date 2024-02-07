import { Plus } from "lucide-react";
import React from "react";

const CreateOrder = () => {
    return (
        <button className="fixed h-20 w-20 rounded-full bg-yellow-200 flex items-center justify-center bottom-3 right-3 transition-all ease-in-out hover:bg-yellow-300 duration-500">
            <Plus size={30} />
        </button>
    );
};

export default CreateOrder;
