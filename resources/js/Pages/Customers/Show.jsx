import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

// Displays full details of a single customer, including their vehicles.
// "customer" comes from CustomerController@show, which eager-loads
// the vehicles relationship (customer.vehicles).
export default function Show({ customer }) {
    return (
        <AuthenticatedLayout>
            <Head title={customer.name} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        {/* Header row: name + Edit button + back link */}
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">{customer.name}</h1>
                            <div className="space-x-3">
                                <Link
                                    href={route('customers.edit', customer.id)}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={route('customers.index')}
                                    className="text-gray-600 hover:underline"
                                >
                                    ← Back to list
                                </Link>
                            </div>
                        </div>

                        {/* Customer details */}
                        <dl className="grid grid-cols-1 gap-4 mb-8">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="text-gray-900">{customer.email}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                <dd className="text-gray-900">{customer.phone}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Address</dt>
                                {/* Show a fallback dash if address wasn't provided */}
                                <dd className="text-gray-900">{customer.address || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Notes</dt>
                                <dd className="text-gray-900">{customer.notes || '—'}</dd>
                            </div>
                        </dl>

                        {/* Vehicles section — will be populated once Vehicle CRUD exists (Day 3) */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Vehicles</h2>

                            {customer.vehicles && customer.vehicles.length > 0 ? (
                                <ul className="divide-y divide-gray-100">
                                    {customer.vehicles.map((vehicle) => (
                                        <li key={vehicle.id} className="py-2">
                                            {vehicle.make} {vehicle.model} — {vehicle.registration_no}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No vehicles registered yet.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}