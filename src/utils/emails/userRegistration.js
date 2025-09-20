export default function userRegistration({ fullName }) {
  return `<div
  style="
    text-align: center;
    padding-top: 1rem;
    font-family: Arial, Helvetica, sans-serif;
  "
>
  <img
    class="logo"
    src="https://files.codingninjas.in/logo1-32230.png"
    alt="F3 chat logo"
    style="width: 200px; height: 200px"
    alt="Welcome Icon"
  />

  <h2>Welcome To Storefleet</h2>
  <span>Hello ${fullName.split(" ")[0]}</span>
  <p>
    Thank you for registering with F3 Chat . We're excited to have you as a
    new member of our community.
  </p>
  <a
    href="https://your-site.com/get-started"
    style="
      display: inline-block;
      background-color: blue;
      border-radius: 8px;
      padding: 10px 20px;
      color: white;
      text-decoration: none;
      font-size: 14px;
      margin-top: 1rem;
    "
    >Get Started</a
  >
</div>`;
}
