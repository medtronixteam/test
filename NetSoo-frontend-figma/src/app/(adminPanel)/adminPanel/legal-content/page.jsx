import Layout from "@/components/dashboard/Layout";

const TermsPage = () => {
  return (
    <Layout>
      <div className="flex justify-between flex-col sm:flex-row gap-3 items-center mb-6">
        <h1 className="text-2xl font-[600] mt-2 ml-1">
          Legal content management
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-1 bg-[#FFFFFF05] border border-[#FFFFFF30] px-3 py-2 rounded-[8px] text-sm text-white min-w-32">
            <span className="inline-block w-4 h-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </span>
            <span>English</span>
            <span className="inline-block w-3 h-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>

          <button className="bg-[#3570BC] hover:bg-blue-600 text-white text-sm px-3 py-2 rounded-[8px] flex items-center gap-1 min-w-32">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M4.66797 5.48633H4.0013C3.64768 5.48633 3.30854 5.6268 3.05849 5.87685C2.80844 6.1269 2.66797 6.46604 2.66797 6.81966V12.8197C2.66797 13.1733 2.80844 13.5124 3.05849 13.7625C3.30854 14.0125 3.64768 14.153 4.0013 14.153H10.0013C10.3549 14.153 10.6941 14.0125 10.9441 13.7625C11.1942 13.5124 11.3346 13.1733 11.3346 12.8197V12.153"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.59 5.20989C13.8526 4.94733 14.0001 4.59122 14.0001 4.2199C14.0001 3.84857 13.8526 3.49246 13.59 3.2299C13.3274 2.96733 12.9713 2.81982 12.6 2.81982C12.2287 2.81982 11.8726 2.96733 11.61 3.2299L6 8.81989V10.8199H8L13.59 5.20989Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.668 4.15332L12.668 6.15332"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0 0.819824)"
                  />
                </clipPath>
              </defs>
            </svg>
            Edit Policies
          </button>
        </div>
      </div>

      <div className="rounded-[8px] backdrop-blur-[111.51px] p-5 border border-[#FFFFFF30] ">
        <h2 className="text-white text-xl font-semibold mb-2">
          Terms and Condition for NETSOO
        </h2>
        <p className="text-white opacity-60 text-sm mb-4">
          Effective Date: January 1, 2024
        </p>
        <p className="text-white opacity-60 text-sm mb-6">
          Welcome to NETSOO! By accessing and using our platform, you agree to
          comply with and be bound by the following Terms and Conditions. Please
          read these terms carefully before using NETSOO.
        </p>

        <div className="mb-8">
          <h3 className="text-white text-xl font-semibold mb-2">
            Acceptance of Terms
          </h3>

          <div className="mb-4">
            <h4 className="text-white text-md opacity-60  font-semibold mb-1">
              1.1 Agreement:
            </h4>
            <p className="text-white opacity-60 text-sm">
              These Terms and Conditions constitute a legally binding agreement
              between you ("User" or "you") and NETSOO ("we", "us," or "our").
              By using our platform, you agree to be bound by these terms.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-white opacity-60 text-md font-semibold mb-1">
              1.2 Changes to Terms:
            </h4>
            <p className="text-white opacity-60 text-sm">
              NETSOO reserves the right to update, modify, or revise these terms
              at any time. Changes will be effective upon posting on the
              platform. It is your responsibility to review these terms
              regularly.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-white text-xl font-semibold mb-2">
            Use of the Platform
          </h3>

          <div className="mb-4">
            <h4 className="text-white  text-md font-semibold mb-1">
              2.1 Eligibility:
            </h4>
            <p className="text-white opacity-60 text-sm">
              You must be at least 18 years old to use NETSOO. By using the
              platform, you confirm that you meet this age requirement.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-white text-md font-semibold mb-1">
              2.2 User Accounts:
            </h4>
            <p className="text-white opacity-60 text-sm">
              Accurate and complete information are required to create accounts.
              You are responsible for maintaining the confidentiality of your
              account information and agree to notify us immediately of any
              unauthorized use.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-white  text-md font-semibold mb-1">
              2.3 Skill Selection:
            </h4>
            <p className="text-white opacity-60 text-sm">
              Seekers may pick up to 5 skills from individual accounts. Business
              users can choose from the Starter, Premium, Elite, or Enterprise
              packages, each offering different features and pricing.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-white  text-md font-semibold mb-1">
              2.4 Payment and Escrow:
            </h4>
            <p className="text-white opacity-60 text-sm">
              Payments are processed through our secure escrow system. Seekers
              must provide accurate payment details, and service providers are
              responsible for delivering the agreed-upon services.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-white text-xl font-semibold mb-2">
            Privacy Policy for NETSOO
          </h3>
          <p className="text-white opacity-60 text-sm mb-3">
            Effective Date: January 1, 2024
          </p>

          <p className="text-white opacity-60 text-sm mb-5">
            Thank you for choosing NETSOO. This Privacy Policy outlines how we
            collect, use, disclose, and safeguard your personal information when
            you use our platform, including our website and mobile application.
            By accessing or using NETSOO, you agree to the terms outlined in
            this Privacy Policy.
          </p>

          <div className="mb-4">
            <h4 className="text-white  text-md font-semibold mb-1">
              1.1 Account Information:
            </h4>
            <p className="text-white opacity-60 text-sm">
              When you create an account, we collect personal information such
              as your name, email address, and contact details.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-white  text-md font-semibold mb-1">
              1.2 Skill Preferences:
            </h4>
            <p className="text-white opacity-60 text-sm">
              Seekers may provide information about their skill preferences to
              match with suitable service providers.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-white  text-md font-semibold mb-1">
              1.3 Payment Information:
            </h4>
            <p className="text-white opacity-60 text-sm">
              We collect payment information to process transactions securely
              through our platform.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-white text-md font-semibold mb-1">
              1.4 Communication Data:
            </h4>
            <p className="text-white opacity-60 text-sm">
              Information exchanged during communication on our platform,
              including messages between seekers and service providers.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-white  text-md font-semibold mb-1">
              1.5 Usage Data:
            </h4>
            <p className="text-white opacity-60 text-sm">
              Data related to your use of our platform, including log data, IP
              addresses, device information, and access times.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-white text-xl font-semibold mb-2">
            Cookies Policy
          </h3>
          <p className="text-white opacity-60 text-sm mb-3">
            Effective Date: January 1, 2024
          </p>

          <p className="text-white opacity-60 text-sm mb-5">
            Thank you for choosing NETSOO. This Privacy Policy outlines how we
            collect, use, disclose, and safeguard your personal information when
            you use our platform, including our website and mobile application.
            By accessing or using NETSOO, you agree to the terms outlined in
            this Privacy Policy.
          </p>

          <div className="mb-4">
            <h4 className="text-white text-xl font-semibold mb-1">
              Introduction
            </h4>
            <p className="text-white opacity-60 text-sm">
              Welcome to NETSOO! This Cookies Policy outlines how we use cookies
              and similar tracking technologies on our website and mobile
              application. By using NETSOO, you consent to the use of cookies as
              described in this policy.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-white text-xl font-semibold mb-1">
              What are Cookies?
            </h4>
          </div>

          <div className="mb-4">
            <h4 className="text-white  text-md font-semibold mb-1">
              2.1 Cookies Defined:
            </h4>
            <p className="text-white opacity-60 text-sm">
              Cookies are small text files that are placed on your device
              (computer, smartphone, or tablet) when you visit a website or use
              a mobile application. They help us improve your experience on
              NETSOO.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-white  text-md font-semibold mb-1">
              2.2 Types of Cookies:
            </h4>
            <p className="text-white opacity-60 text-sm">
              NETSOO uses both session and persistent cookies. Session cookies
              are temporary and are deleted when you close your browser.
              Persistent cookies remain on your device for a specified period or
              until you delete them.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
