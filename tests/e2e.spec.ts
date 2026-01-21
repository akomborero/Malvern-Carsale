import { test, expect, type Page, type Dialog } from '@playwright/test';

test('Breezecars E2E: Login, Create, View, and Delete Car', async ({ page }: { page: Page }) => {
  // 1. Start at the homepage
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Breezecars/);
  await expect(page.getByText('ELEVATE YOUR DRIVING')).toBeVisible();

  // 2. Login as Admin
  // Open the Auth Modal
  await page.getByRole('button', { name: 'Sign In' }).first().click();
  await expect(page.getByText('Welcome Back')).toBeVisible();

  // Fill in credentials (using dummy data as configured in AuthProvider)
  await page.getByPlaceholder('Email Address').fill('admin@breezecars.com');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Verify login success (Admin Panel link should be visible)
  await expect(page.getByRole('link', { name: 'Admin Panel' }).first()).toBeVisible();

  // 3. Navigate to Admin Panel
  await page.getByRole('link', { name: 'Admin Panel' }).first().click();
  await expect(page.getByRole('heading', { name: 'Admin Panel' })).toBeVisible();

  // 4. Create a new car
  const carName = `Test Car ${Date.now()}`;
  const carPrice = '$123,456';
  
  await page.getByTestId('input-name').fill(carName);
  await page.getByTestId('input-price').fill(carPrice);
  await page.getByTestId('input-year').fill('2025');
  await page.getByTestId('input-mileage').fill('100 km');
  await page.getByTestId('input-transmission').fill('Automatic');
  await page.getByTestId('input-fuel').fill('Electric');
  await page.getByTestId('input-description').fill('This is an automated test car created by Playwright.');
  
  // Submit the form
  await page.getByTestId('btn-submit').click();

  // Verify car is listed in Admin Panel "Current Cars" list
  await expect(page.getByText(carName)).toBeVisible();

  // 5. Verify car is listed on Homepage
  await page.goto('http://localhost:3000');
  await expect(page.getByText(carName)).toBeVisible();
  await expect(page.getByText(carPrice)).toBeVisible();

  // 6. View Car Details
  // Find the card container that has our car name, then click the Details link inside it
  const carCard = page.getByTestId('vehicle-card').filter({ hasText: carName });
  await carCard.getByTestId('link-details').click();

  // Verify details page content
  await expect(page.getByRole('heading', { name: carName })).toBeVisible();
  await expect(page.getByText('Electric')).toBeVisible();
  await expect(page.getByText('This is an automated test car created by Playwright.')).toBeVisible();

  // 7. Delete the car
  // Go back to admin panel
  await page.goto('http://localhost:3000/admin');
  
  // Handle the browser confirmation dialog for deletion
  page.on('dialog', (dialog: Dialog) => dialog.accept());

  // Find the row with our car and click the Delete button
  const adminRow = page.getByTestId('admin-car-row').filter({ hasText: carName });
  await adminRow.getByTestId('btn-delete').click();

  // Verify car is removed from Admin Panel
  await expect(page.getByText(carName)).not.toBeVisible();

  // 8. Verify car is removed from Homepage
  await page.goto('http://localhost:3000');
  await expect(page.getByText(carName)).not.toBeVisible();
});