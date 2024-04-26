'use client'
import {useEffect} from "react";
import PeopleService from "@/services/people";
import {Table} from "@/components/elements";

export default function Page() {

    useEffect(() => {
        PeopleService.getPeople().then((res) => {
            console.log('res', res)
        }).catch((e) => {
            console.log('e', e)
        });
    }, []);

    const columnDefs = [];

    return (
        <div>
            <div className="card p-4 rounded-lg">
                <Table columnDefs={columnDefs} objects={[]}/>
            </div>

        </div>
    );
}
