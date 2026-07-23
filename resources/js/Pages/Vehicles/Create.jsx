import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Form';

// "customers" comes from VehicleController@create — needed for the dropdown
export default function Create({ customers }) {
    return (
        <AuthenticatedLayout>
            <Head title="Add Vehicle" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                            Add New Vehicle
                        </h1>

                        <Form customers={customers} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}