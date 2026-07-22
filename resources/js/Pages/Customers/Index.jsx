import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

// This page displays a paginated, searchable list of customers.
// It receives "customers" (paginated data) and "filters" (current search term)
// as props from CustomerController@index
export default function Index({ customers, filters }) {
    // Local state for the search input box
    const [search, setSearch] = useState(filters.search || '');

    // Runs when the user submits the search form.
    // Instead of a full page reload, Inertia sends a request
    // and only updates the relevant page data.
    function handleSearch(e) {
        e.preventDefault();
        router.get(route('customers.index'), { search }, {
            preserveState: true, // keeps scroll position etc.
        });
    }

    // Runs when the user clicks the Delete button on a customer row.
    // Shows a confirmation before actually deleting.
    function handleDelete(customerId) {
        if (confirm('Are you sure you want to delete this customer? This cannot be undone.')) {
            router.delete(route('customers.destroy', customerId));
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Customers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        {/* Header row: title + Add Customer button */}
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
                            <Link
                                href={route('customers.create')}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                + Add Customer
                            </Link>
                        </div>

                        {/* Search bar */}
                        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or email..."
                                className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-sm"
                            />
                            <button
                                type="submit"
                                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                            >
                                Search
                            </button>
                        </form>

                        {/* Customers table */}
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-2 px-3">Name</th>
                                    <th className="py-2 px-3">Email</th>
                                    <th className="py-2 px-3">Phone</th>
                                    <th className="py-2 px-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.data.map((customer) => (
                                    <tr key={customer.id} className="border-b border-gray-100">
                                        {/* Customer name is now a clickable link to the Show page */}
                                        <td className="py-2 px-3">
                                            <Link
                                                href={route('customers.show', customer.id)}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                {customer.name}
                                            </Link>
                                        </td>
                                        <td className="py-2 px-3">{customer.email}</td>
                                        <td className="py-2 px-3">{customer.phone}</td>
                                        <td className="py-2 px-3 space-x-2">
                                            <Link
                                                href={route('customers.edit', customer.id)}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(customer.id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {/* Shown when there are no customers at all, or no search matches */}
                                {customers.data.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-4 px-3 text-center text-gray-500">
                                            No customers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination links, provided automatically by Laravel's paginate() */}
                        <div className="mt-4 flex gap-2">
                            {customers.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    className={`px-3 py-1 rounded-md text-sm ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 text-gray-700'
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