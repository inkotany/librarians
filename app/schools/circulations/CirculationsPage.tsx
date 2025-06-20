"use client";
import { Spinner } from "@radix-ui/themes";
import CirculationsTable from "./CirculationTable";
import { useCirculationsQuery } from "./hooks"

const CirculationsPage = () => {
    console.log('Render from Circulation Page');
    const { data, isLoading, error } = useCirculationsQuery();

    if (isLoading) return <Spinner />;
    if (error) return <div>Error loading circulations</div>;

    return <CirculationsTable circulations={data} />;
}

export default CirculationsPage
