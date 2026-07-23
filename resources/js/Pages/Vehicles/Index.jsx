import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

// Lists vehicles with search + pagination.
// "vehicles" = paginated data from VehicleController@index (includes owning customer)
export default function Index({ vehicles, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    // check role to conditionally show create/edit/delete buttons
    const roles = usePage().props.auth.roles;
    const canManage = roles.includes('admin') || roles.includes('service-advisor');

    function handleSearch(e) {
        e.preventDefault();
        router.get(route('vehicles.index'), { search }, { preserveState: true });
    }

    function handleDelete(vehicleId) {
        if (confirm('Are you sure you want to delete this vehicle? This cannot be undone.')) {
            router.delete(route('vehicles.destroy', vehicleId));
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Vehicles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Vehicles</h1>

                            {/* Only Admin/Advisor see the Add button — Mechanic is view-only */}
                            {canManage && (
                                <Link
                                    href={route('vehicles.create')}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                >
                                    + Add Vehicle
                                </Link>
                            )}
                        </div>

                        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by registration no. or VIN..."
                                className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-sm"
                            />
                            <button type="submit" className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
                                Search
                            </button>
                        </form>

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-2 px-3">Registration No.</th>
                                    <th className="py-2 px-3">Make / Model</th>
                                    <th className="py-2 px-3">Owner</th>
                                    <th className="py-2 px-3">Mileage</th>
                                    {canManage && <th className="py-2 px-3">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.data.map((vehicle) => (
                                    <tr key={vehicle.id} className="border-b border-gray-100">
                                        <td className="py-2 px-3">
                                            <Link
                                                href={route('vehicles.show', vehicle.id)}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                {vehicle.registration_no}
                                            </Link>
                                        </td>
                                        <td className="py-2 px-3">{vehicle.make} {vehicle.model}</td>
                                        {/* customer relationship was eager-loaded in the controller */}
                                        <td className="py-2 px-3">{vehicle.customer?.name}</td>
                                        <td className="py-2 px-3">{vehicle.mileage} km</td>
                                        {canManage && (
                                            <td className="py-2 px-3 space-x-2">
                                                <Link
                                                    href={route('vehicles.edit', vehicle.id)}
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(vehicle.id)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}

                                {vehicles.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-4 px-3 text-center text-gray-500">
                                            No vehicles found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="mt-4 flex gap-2">
                            {vehicles.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    className={`px-3 py-1 rounded-md text-sm ${
                                        link.active ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}