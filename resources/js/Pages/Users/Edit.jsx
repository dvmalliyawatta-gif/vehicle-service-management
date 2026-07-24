import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Form';

export default function Edit({ user }) {
    return (
        <AuthenticatedLayout>
            <Head title="Edit User" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                            Edit User
                        </h1>

                        <Form user={user} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}