import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Show({ mechanic }) {
    const roles = usePage().props.auth.roles;
    const isAdmin = roles.includes('admin');

    return (
        <AuthenticatedLayout>
            <Head title={mechanic.name} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">{mechanic.name}</h1>
                            <div className="space-x-3">
                                {/* only Admin can edit — Advisor is view-only per policy */}
                                {isAdmin && (
                                    <Link
                                        href={route('mechanics.edit', mechanic.id)}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                    >
                                        Edit
                                    </Link>
                                )}
                                <Link
                                    href={route('mechanics.index')}
                                    className="text-gray-600 hover:underline"
                                >
                                    ← Back to list
                                </Link>
                            </div>
                        </div>

                        <dl className="grid grid-cols-1 gap-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Employee ID</dt>
                                <dd className="text-gray-900">{mechanic.employee_id}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Specialization</dt>
                                <dd className="text-gray-900">{mechanic.specialization || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Contact</dt>
                                <dd className="text-gray-900">{mechanic.contact}</dd>
                            </div>
                        </dl>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}