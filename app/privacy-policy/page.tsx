import { LayoutProvider } from "@/components/providers/layout-provider";
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <LayoutProvider>
      <div className="max-w-[50rem] mx-auto p-2 flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-1">
          <h2 className="text-3xl font-semibold">Privacy policy</h2>
          <p>
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You.
          </p>
          <p>
            We use Your Personal data to provide and improve the Service. By
            using the Service, You agree to the collection and use of
            information in accordance with this Privacy Policy.
          </p>
        </div>
        {/* Interpretation and Definition */}
        <div className="flex flex-col gap-y-1">
          <h3 className="text-2xl font-semibold">
            Interpretation and Definitions
          </h3>
          <div>
            <h4 className="text-xl font-semibold">Interpretation</h4>
            <p>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Definitions</h4>
            <p>For the purposes of this Privacy Policy:</p>
            <ul className="flex flex-col gap-y-1 list-disc pl-5">
              <li>
                <span className="text-lg font-semibold">You</span> means the
                individual accessing or using the Service, or the company, or
                other legal entity on behalf of which such individual is
                accessing or using the Service, as applicable.
              </li>
              <li>
                <span className="text-lg font-semibold">Company</span> (referred
                to as either "the Company", "We", "Us" or "Our" in this
                Agreement) refers to Opes International Limited, 89, Allen
                Avenue, Ikeja, Lagos, Nigeria.
              </li>
              <li>
                <span className="text-lg font-semibold">Affiliate</span>means an
                entity that controls, is controlled by or is under common
                control with a party, where "control" means ownership of 50% or
                more of the shares, equity interest or other securities entitled
                to vote for election of directors or other managing authority.
              </li>
              <li>
                <span className="text-lg font-semibold">Account</span> means a
                unique account created for You to access our Service or parts of
                our Service.
              </li>
              <li>
                <span className="text-lg font-semibold">Website</span> refers to
                Opes, accessible from https://www.opes-tech.com
              </li>
              <li>
                <span className="text-lg font-semibold">Service</span> refers to
                the Website.
              </li>
              <li>
                <span className="text-lg font-semibold">Country</span> refers
                to: Nigeria
              </li>
              <li>
                <span className="text-lg font-semibold">Service Provider</span>{" "}
                means any natural or legal person who processes the data on
                behalf of the Company. It refers to third-party companies or
                individuals employed by the Company to facilitate the Service,
                to provide the Service on behalf of the Company, to perform
                services related to the Service or to assist the Company in
                analyzing how the Service is used.
              </li>
              <li>
                <span className="text-lg font-semibold">
                  Third-party Social Media Service
                </span>{" "}
                refers to any website or any social network website through
                which a User can log in or create an account to use the Service.
              </li>
              <li>
                <span className="text-lg font-semibold">Personal Data</span> is
                any information that relates to an identified or identifiable
                individual.
              </li>
              <li>
                <span className="text-lg font-semibold">Cookies</span> are small
                files that are placed on Your computer, mobile device or any
                other device by a website, containing the details of Your
                browsing history on that website among its many uses.
              </li>
              <li>
                <span className="text-lg font-semibold">Usage Data</span> refers
                to data collected automatically, either generated by the use of
                the Service or from the Service infrastructure itself (for
                example, the duration of a page visit).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </LayoutProvider>
  );
};

export default PrivacyPolicyPage;
