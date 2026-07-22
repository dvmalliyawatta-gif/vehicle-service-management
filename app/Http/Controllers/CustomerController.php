<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use App\Services\CustomerService;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    /**
     * We "inject" CustomerService here so every method below
     * can use it via $this->customerService, instead of creating
     * a new instance manually each time.
     */
    public function __construct(protected CustomerService $customerService)
    {
    }

    /**
     * Display a paginated list of customers.
     * Supports basic search via a "search" query parameter.
     */
    public function index(): Response
    {
        $customers = Customer::query()
            // If a search term was provided in the URL (?search=...),
            // filter customers whose name or email contains it
            ->when(request('search'), function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            })
            ->latest() // newest customers first
            ->paginate(10) // 10 per page, Laravel handles pagination automatically
            ->withQueryString(); // keeps the ?search=... in pagination links

        return Inertia::render('Customers/Index', [
            'customers' => $customers,
            'filters' => request()->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new customer.
     * (We're using modal-based forms per the assignment's UI requirement,
     * so this may not render a separate page — but we keep it for completeness.)
     */
    public function create(): Response
    {
        return Inertia::render('Customers/Create');
    }

    /**
     * Store a newly created customer.
     * $request is already validated by StoreCustomerRequest
     * before this method even runs.
     */
    public function store(StoreCustomerRequest $request)
    {
        // Authorize this action using CustomerPolicy
        $this->authorize('create', Customer::class);

        $this->customerService->create($request->validated());

        return redirect()->route('customers.index')
            ->with('success', 'Customer created successfully.');
    }

    /**
     * Display a single customer's details.
     */
    public function show(Customer $customer): Response
    {
        $this->authorize('view', $customer);

        return Inertia::render('Customers/Show', [
            'customer' => $customer->load('vehicles'), // eager load their vehicles too
        ]);
    }

    /**
     * Show the form for editing an existing customer.
     */
    public function edit(Customer $customer): Response
    {
        $this->authorize('update', $customer);

        return Inertia::render('Customers/Edit', [
            'customer' => $customer,
        ]);
    }

    /**
     * Update an existing customer.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $this->authorize('update', $customer);

        $this->customerService->update($customer, $request->validated());

        return redirect()->route('customers.index')
            ->with('success', 'Customer updated successfully.');
    }

    /**
     * Delete a customer.
     */
    public function destroy(Customer $customer)
    {
        $this->authorize('delete', $customer);

        $this->customerService->delete($customer);

        return redirect()->route('customers.index')
            ->with('success', 'Customer deleted successfully.');
    }
}