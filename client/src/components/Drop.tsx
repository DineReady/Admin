import React from "react";
import { useDroppable } from "@dnd-kit/core";

type DropProps = {
    children: React.ReactNode;
};

export default function Drop(props: DropProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: "droppable",
    });
    const style = {
        color: isOver ? "green" : undefined,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}
