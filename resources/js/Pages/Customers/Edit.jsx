import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Form';

// This page receives "customer" from CustomerController@edit
// and passes it into the shared Form component, which then
// knows to render in "editing" mode (pre-filled fields, PUT request).
export default function Edit({ customer }) {
    return (
        <AuthenticatedLayout>
            <Head title="Edit Customer" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                            Edit Customer
                        </h1>

                        <Form customer={customer} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}