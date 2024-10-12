import { test, expect, devices } from "@playwright/test";

const pageUrl = "https://stage-stories-new.vercel.app/";

test("has title on mobile", async ({ browser }) => {
  // Use iPhone 12 device descriptor
  const iPhone12 = devices["iPhone 12"];

  // Create a new context with the iPhone 12 settings
  const context = await browser.newContext({
    ...iPhone12,
  });

  // Create a new page in the mobile context
  const page = await context.newPage();

  // Navigate to your website
  await page.goto(pageUrl);

  // Expect the page title to contain the substring "Stage Stories"
  await expect(page).toHaveTitle(/Stage Stories/);

  // Close the context after the test
  await context.close();
});

test("select random user from users-list and check whether story is rendered and closed", async ({
  browser,
}) => {
  const iPhone12 = devices["iPhone 12"];

  // Create a new context with the iPhone 12 settings
  const context = await browser.newContext({
    ...iPhone12,
  });

  const page = await context.newPage();

  await page.goto(pageUrl);

  // Check if the div with class 'users-list' has children
  const userList = await page.$(".users-list");

  if (!userList) {
    throw new Error("The users-list element was not found.");
  }

  const children = await userList.$$(":scope > *"); // Get direct children of users-list

  if (!children || children.length === 0) {
    throw new Error("No children found in the users-list.");
  }

  // Select a random child from the list
  const randomChild = children[Math.floor(Math.random() * children.length)];

  // Find the image tag within the random child
  const img = await randomChild.$("img");

  if (!img) {
    throw new Error("No image found in the selected child element.");
  }

  // Click on the image to open the story
  await img.click();

  // Wait for the 'story-viewer' div and check if the story image is visible
  const storyImage = page.locator(".story-image");
  await expect(storyImage).toBeVisible(); // Ensures story image is visible

  // Find the image with alt attribute 'cross-icon' to close the story
  const crossIcon = page.locator('img[alt="cross-icon"]');

  if (!(await crossIcon.isVisible())) {
    throw new Error("The cross-icon to close the story was not found.");
  }

  // Click the cross-icon to close the story
  await crossIcon.click();

  // Verify that the story image is no longer visible after closing
  await expect(storyImage).not.toBeVisible(); // Ensures story image is hidden
});
test("select random user from users-list and check whether story is of his profile", async ({
  browser,
}) => {
  const iPhone12 = devices["iPhone 12"];

  // Create a new context with the iPhone 12 settings
  const context = await browser.newContext({
    ...iPhone12,
  });

  const page = await context.newPage();

  await page.goto(pageUrl);

  // Check if the div with class 'users-list' has children
  const userList = await page.$(".users-list");

  if (!userList) {
    throw new Error("The users-list element was not found.");
  }

  const children = await userList.$$(":scope > *"); // Get direct children of users-list

  if (!children || children.length === 0) {
    throw new Error("No children found in the users-list.");
  }

  // Select a random child from the list
  const randomChild = children[Math.floor(Math.random() * children.length)];

  // Find the image tag within the random child
  const img = await randomChild.$("img");

  if (!img) {
    throw new Error("No image found in the selected child element.");
  }

  // Get the alt attribute of the image
  const altText = await img.getAttribute("alt");

  if (!altText) {
    throw new Error("The image does not have an alt attribute.");
  }

  console.log(`Selected Image alt text: ${altText}`);

  // Click on the image
  await img.click();

  // Wait for the 'story-viewer' div to appear after the image click
  const storyViewer = await page.waitForSelector(".story-viewer", {
    state: "visible",
  });
  expect(storyViewer).toBeTruthy(); // Ensure story-viewer is present

  // Find the story-info element inside story-viewer
  const storyInfo = await storyViewer.$(".story-info");
  expect(storyInfo).toBeTruthy(); // Ensure story-info is present

  if (!storyInfo) {
    throw new Error(
      "The story-info element was not found inside the story-viewer."
    );
  }

  // Find the image inside story-info with an alt matching "Rahul Verma's profile" (or any dynamic altText)
  const profileImg = await storyInfo.$(`img[alt="${altText}'s profile"]`);

  if (!profileImg) {
    throw new Error(`No profile image found with alt "${altText}'s profile"`);
  }

  // Optionally, log or assert the alt text of the profile image
  const profileAltText = await profileImg.getAttribute("alt");
  console.log(`Profile Image alt text: ${profileAltText}`);

  // Ensure the alt attribute of the profile image matches the expected format
  expect(profileAltText).toBe(`${altText}'s profile`);
});

test("navigate through stories and check style previous and next are working", async ({ browser }) => {
  const iPhone12 = devices["iPhone 12"];

  // Create a new context with the iPhone 12 settings
  const context = await browser.newContext({
    ...iPhone12,
  });

  const page = await context.newPage();

  await page.goto(pageUrl);

  // Check if the div with class 'users-list' has children
  const userList = await page.$(".users-list");

  if (!userList) {
    throw new Error("The users-list element was not found.");
  }

  const children = await userList.$$(":scope > *"); // Get direct children of users-list

  if (!children || children.length === 0) {
    throw new Error("No children found in the users-list.");
  }

  // Select a random child from the list
  const randomChild = children[Math.floor(Math.random() * children.length)];

  // Find the image tag within the random child
  const img = await randomChild.$("img");

  if (!img) {
    throw new Error("No image found in the selected child element.");
  }

  // Click on the image to open the story
  await img.click();

  // Wait for the 'story-image' div to appear and get its initial style attribute
  const storyImage = page.locator(".story-image");
  await expect(storyImage).toBeVisible();

  // Store the initial style attribute of the story-image
  const initialStyle = await storyImage.getAttribute("style");
  console.log(`Initial story-image style: ${initialStyle}`);

  // Click on the 'next' button to navigate to the next story
  const nextButton = page.locator(".story-nav.next");
  await nextButton.click();

  // Get the new style attribute after navigating to the next story
  const nextStyle = await storyImage.getAttribute("style");
  console.log(`Next story-image style: ${nextStyle}`);

  // Verify that the style attribute has changed
  expect(nextStyle).not.toBe(initialStyle);

  // Click on the 'prev' button to navigate back to the previous story
  const prevButton = page.locator(".story-nav.prev");
  await prevButton.click();

  // Get the style attribute after navigating back to the previous story
  const prevStyle = await storyImage.getAttribute("style");
  console.log(`Previous story-image style: ${prevStyle}`);

  // Verify that the style attribute matches the initial value
  expect(prevStyle).toBe(initialStyle);
});