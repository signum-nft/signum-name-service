import type { NextPage } from "next";
import { Title } from "./components/Title";
import { SubTitle } from "./components/SubTitle";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const Privacy: NextPage = () => {
  return (
    <Grid container direction="column" maxWidth={1200} mx="auto" my={10}>
      <Title content="Privacy Policy" date="Last updated - August 29, 2023" />

      <Grid item container direction="column" rowSpacing={1} sx={{ px: 2 }}>
        <Grid item>
          <SubTitle content="Welcome" />
          <Typography>
            This privacy policy (“policy”) describes how the website operator
            (“website”, “Interface”,“we”, “us”, or “our”) collects, protects,
            and uses the personally identifiable information (“personal
            information”) that you (“user”, “you”, or “your”) may provide on the
            sns.signum.network website and any of its products or services
            (collectively, “website”, or “services”). It also describes the
            choices available to you regarding our use of your personal
            information and how you can access and update this information. This
            policy does not apply to the practices of companies that we do not
            own or control, or to individuals that we do not employ or manage.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Privacy" />
          <Typography gutterBottom>
            When you use the Interface, the only information we collect from you
            is your blockchain wallet address, completed transaction hashes, and
            the token names, symbols, or other blockchain identifiers. We do not
            collect any personal information from you (e.g., your name or other
            identifiers that can be linked to you). We do, however, use
            third-party service providers, like Cloudflare which may receive or
            independently obtain your personal information from
            publicly-available sources. We do not control how these third
            parties handle your data and you should review their privacy
            policies to understand how they collect, use, and share your
            personal information.
          </Typography>

          <Typography gutterBottom>
            Please note that when you use the Interface, you are interacting
            with the Signum blockchain, which provides transparency into your
            transactions. The interface does not control and is not responsible
            for any information you make public on the Signum blockchain by
            taking actions through the Interface.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Automatic collection of information" />
          <Typography>
            When you visit the website, our servers automatically record
            information that your browser sends. This data may include
            information such as your devices IP address, your browser type and
            version, your operating system type and version, your language
            preferences, the webpage you were visiting before you came to our
            website, pages of our website that you visit, the time spent on
            those pages, information that you search for on our website, access
            times and dates, and other statistics.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Third-Party Websites" />
          <Typography>
            Our Service may contain links to third-party websites. When you
            click on a link to any other website or location, you will leave our
            Service and go to another site, and another entity may collect
            Personal Data from you. We have no control over, do not review, and
            cannot be responsible for these third-party websites or their
            content. Please be aware that the terms of this Privacy Policy do
            not apply to these third-party websites or their content, or to any
            collection of your Personal Data after you click on links to such
            third-party websites. We encourage you to read the privacy policies
            of every website you visit. Any links to third-party websites or
            locations are for your convenience and do not signify our
            endorsement of such third parties or their products, content, or
            websites.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Third-Party Wallets" />
          <Typography>
            To use our Interface, you must use a third-party wallet which allows
            you to engage in transactions on Signum blockchain. Your
            interactions with any third-party wallet provider are governed by
            the applicable Terms of Service and privacy policy of that third
            party.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Changes to This Privacy Policy" />
          <Typography>
            This Privacy Policy may be updated from time to time for any reason.
            We will notify you of any changes to our Privacy Policy by posting
            the new Privacy Policy on our webpage. The date the Privacy Policy
            was last revised is identified at the beginning of this Privacy
            Policy. You are responsible for periodically visiting our Service
            and this Privacy Policy to check for any changes.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Questions, Contacting DeFiPortal, Reporting Violations" />
          <Typography>
            If you have any questions or concerns or complaints about our
            Privacy Policy or our data collection or processing practices, or if
            you want to report any security violations to us, please contact us
            by email.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
