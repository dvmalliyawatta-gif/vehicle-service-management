import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

// Displays full details of a single vehicle, including its owner.
// "vehicle" comes from VehicleController@show, with customer eager-loaded.
export default function Show({ vehicle }) {
    const roles = usePage().props.auth.roles;
    const canManage = roles.includes('admin') || roles.includes('service-advisor');

    return (
        <AuthenticatedLayout>
            <Head title={vehicle.registration_no} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">
                                {vehicle.make} {vehicle.model}
                            </h1>
                            <div className="space-x-3">
                                {/* Edit button hidden for Mechanic (view-only per policy) */}
                                {canManage && (
                                    <Link
                                        href={route('vehicles.edit', vehicle.id)}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                    >
                                        Edit
                                    </Link>
                                )}
                                <Link
                                    href={route('vehicles.index')}
                                    className="text-gray-600 hover:underline"
                                >
                                    ← Back to list
                                </Link>
                            </div>
                        </div>

                        <dl className="grid grid-cols-1 gap-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Owner</dt>
                                <dd className="text-gray-900">
                                    <Link
                                        href={route('customers.show', vehicle.customer.id)}
                                        className="text-indigo-600 hover:underline"
                                    >
                                        {vehicle.customer.name}
                                    </Link>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Registration No.</dt>
                                <dd className="text-gray-900">{vehicle.registration_no}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Year</dt>
                                <dd className="text-gray-900">{vehicle.year}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">VIN</dt>
                                <dd className="text-gray-900">{vehicle.vin}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Mileage</dt>
                                <dd className="text-gray-900">{vehicle.mileage} km</dd>
                            </div>
                        </dl>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}