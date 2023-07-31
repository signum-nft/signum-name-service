import type { NextPage } from "next";
import { Title } from "./components/Title";
import { SubTitle } from "./components/SubTitle";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const Terms: NextPage = () => {
  return (
    <Grid container direction="column" maxWidth={1200} mx="auto" my={10}>
      <Title
        content="Terms of Service"
        date="Last updated - September 20, 2022"
      />

      <Grid item container direction="column" rowSpacing={1} sx={{ px: 2 }}>
        <Grid item>
          <SubTitle content="Welcome" />
          <Typography gutterBottom>
            Welcome to signumswap.com. A website-hosted user interface (the
            "Interface" or "App" or ”we”). The Interface provides access to a
            decentralized protocol on the Signum blockchain that allows users to
            trade certain digital assets (the "Protocol"). The Interface is one,
            but not the exclusive, means of accessing the Protocol.
          </Typography>

          <Typography gutterBottom>
            This Terms of Service Agreement (the "Agreement") explains the terms
            and conditions by which you may access and use the Interface. You
            must read this Agreement carefully. By accessing or using the
            Interface, you signify that you have read, understand, and agree to
            be bound by this Agreement in its entirety. If you do not agree, you
            are not authorized to access or use the Interface and should not use
            the Interface.
          </Typography>
        </Grid>

        <Grid item>
          <Typography fontWeight={700}>
            NOTICE: Please read this Agreement carefully as it governs your use
            of the Interface. This Agreement contains important information,
            including a binding arbitration provision and a class action waiver,
            both of which impact your rights as to how disputes are resolved.
            The Interface is only available to you — and you should only access
            the Interface — if you agree completely with these terms.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Modification of this Agreement" />
          <Typography>
            We reserve the right, in our sole discretion, to modify this
            Agreement from time to time. If we make any modifications, we will
            notify you by updating the date at the top of the Agreement and by
            maintaining a current version of the Agreement at{" "}
            <a href="/terms">signumswap.com/terms</a>. All modifications will be
            effective when they are posted, and your continued accessing or use
            of the Interface will serve as confirmation of your acceptance of
            those modifications. If you do not agree with any modifications to
            this Agreement, you must immediately stop accessing and using the
            Interface.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Eligibility" />
          <Typography gutterBottom>
            To access or use the Interface, you must be able to form a legally
            binding contract. Accordingly, you represent that you are at least
            the age of majority in your jurisdiction (e.g., eighteen years old)
            and have the full right, power, and authority to enter into and
            comply with the terms and conditions of this Agreement on behalf of
            yourself and any company or legal entity for which you may access or
            use the Interface.
          </Typography>

          <Typography gutterBottom>
            You further represent that you are not (a) the subject of economic
            or trade sanctions administered or enforced by any governmental
            authority or otherwise designated on any list of prohibited or
            restricted parties (including but not limited to the list maintained
            by the Office of Foreign Assets Control of the U.S. Department of
            the Treasury) or (b) a citizen, resident, or organized in a
            jurisdiction or territory that is the subject of comprehensive
            country-wide, territory-wide, or regional economic sanctions by the
            United States. Finally, you represent that your access and use of
            the Interface will fully comply with all applicable laws and
            regulations, and that you will not access or use the Interface to
            conduct, promote, or otherwise facilitate any illegal activity.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Additional Rights" />
          <Typography>
            We reserve the following rights, which do not constitute obligations
            of ours: (a) with or without notice to you, to modify, substitute,
            eliminate or add to the Interface; (b) to review, modify, filter,
            disable, delete and remove any and all content and information from
            the Interface; and (c) to cooperate with any law enforcement, court
            or government investigation or order or third party requesting or
            directing that we disclose information or content or information
            that you provide.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Privacy" />
          <Typography gutterBottom>
            When you use the Interface, the only information we collect from you
            is your blockchain wallet address, completed transaction hashes, and
            the token names, symbols, or other blockchain identifiers of the
            tokens that you swap. We do not collect any personal information
            from you (e.g., your name or other identifiers that can be linked to
            you). We do, however, use third-party service providers, like
            Cloudflare which may receive or independently obtain your personal
            information from publicly-available sources. We do not control how
            these third parties handle your data and you should review their
            privacy policies to understand how they collect, use, and share your
            personal information.
          </Typography>

          <Typography>
            Please note that when you use the Interface, you are interacting
            with the Signum blockchain, which provides transparency into your
            transactions. The interface does not control and is not responsible
            for any information you make public on the Signum blockchain by
            taking actions through the Interface.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Prohibited Activity" />
          <Typography gutterBottom>
            You agree not to engage in, or attempt to engage in, any of the
            following categories of prohibited activity in relation to your
            access and use of the Interface:
          </Typography>

          <Grid item container rowSpacing={1} component="ul">
            <Grid item component="li">
              <b>Intellectual Property Infringement:</b> Activity that infringes
              on or violates any copyright, trademark, service mark, patent,
              right of publicity, right of privacy, or other proprietary or
              intellectual property rights under the law.
            </Grid>

            <Grid item component="li">
              <b>Cyberattack:</b> Activity that seeks to interfere with or
              compromise the integrity, security, or proper functioning of any
              computer, server, network, personal device, or other information
              technology system, including (but not limited to) the deployment
              of viruses and denial of service attacks.
            </Grid>

            <Grid item component="li">
              <b>Fraud and Misrepresentation:</b> Activity that seeks to defraud
              us or any other person or entity, including (but not limited to)
              providing any false, inaccurate, or misleading information in
              order to unlawfully obtain the property of another.
            </Grid>

            <Grid item component="li">
              <b>Market Manipulation:</b> Activity that violates any applicable
              law, rule, or regulation concerning the integrity of trading
              markets, including (but not limited to) the manipulative tactics
              commonly known as spoofing and wash trading.
            </Grid>

            <Grid item component="li">
              <b>Securities and Derivatives Violations:</b> Activity that
              violates any applicable law, rule, or regulation concerning the
              trading of securities or derivatives.
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <SubTitle content="Not Registered with the SEC or Any Other Agency" />
          <Typography>
            The interface is not registered with the U.S. Securities and
            Exchange Commission as a national securities exchange or in any
            other capacity. You understand and acknowledge that the interface
            does not broker trading orders on your behalf nor do it collect or
            earn fees from your trades on the Protocol. It also does not
            facilitate the execution or settlement of your trades, which occur
            entirely on the public distributed Signum blockchain.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Non-Solicitation; No Investment Advice" />
          <Typography gutterBottom>
            You agree and understand that all trades you submit through the
            Interface are considered unsolicited, which means that you have not
            received any investment advice from the App in connection with any
            trades, and that the interface do not conduct a suitability review
            of any trades you submit.
          </Typography>
          <Typography>
            All information provided by the Interface is for informational
            purposes only and should not be construed as investment advice. You
            should not take, or refrain from taking, any action based on any
            information contained in the Interface. You alone are responsible
            for determining whether any investment, investment strategy or
            related transaction is appropriate for you based on your personal
            investment objectives, financial circumstances, and risk tolerance.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="No Warranties" />
          <Typography>
            The Interface is provided on an "AS IS" and "AS AVAILABLE" basis. To
            the fullest extent permitted by law, it disclaims any
            representations and warranties of any kind, whether express,
            implied, or statutory, including (but not limited to) the warranties
            of merchantability and fitness for a particular purpose. You
            acknowledge and agree that your use of the Interface is at your own
            risk. We do not represent or warrant that access to the Interface
            will be continuous, uninterrupted, timely, or secure; that the
            information contained in the Interface will be accurate, reliable,
            complete, or current; or that the Interface will be free from
            errors, defects, viruses, or other harmful elements. No advice,
            information, or statement that we make should be treated as creating
            any warranty concerning the Interface. It does not endorse,
            guarantee, or assume responsibility for any advertisements, offers,
            or statements made by third parties concerning the Interface.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Non-Custodial and No Fiduciary Duties" />
          <Typography>
            The Interface is a purely non-custodial application, meaning you are
            solely responsible for the custody of the cryptographic private keys
            to the digital asset wallets you hold. This Agreement is not
            intended to, and does not, create or impose any fiduciary duties on
            it. To the fullest extent permitted by law, you acknowledge and
            agree that using the interface owe no fiduciary duties or
            liabilities to you or any other party, and that to the extent any
            such duties or liabilities may exist at law or in equity, those
            duties and liabilities are hereby irrevocably disclaimed, waived,
            and eliminated.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Assumption of Risk" />
          <Typography gutterBottom>
            By accessing and using the Interface, you represent that you are
            financially and technically sophisticated enough to understand the
            inherent risks associated with using cryptographic and
            blockchain-based systems, and that you have a working knowledge of
            the usage and intricacies of digital assets such as bitcoin (BTC)
            and other digital tokens such as those following the Signum Smart
            Token Standard. In particular, you understand that blockchain-based
            transactions are irreversible.
          </Typography>
          <Typography>
            You further understand that the markets for these digital assets are
            highly volatile due to factors including (but not limited to)
            adoption, speculation, technology, security, and regulation. You
            acknowledge and accept that the cost and speed of transacting with
            cryptographic and blockchain-based systems such as Signum are
            variable and may increase dramatically at any time. You further
            acknowledge and accept the risk that your digital assets may lose
            some or all of their value while they are supplied to the Protocol
            through the Interface, you may suffer loss due to the fluctuation of
            prices of tokens in a trading pair or liquidity pool, and,
            especially in expert modes, experience significant price slippage
            and cost. You understand that anyone can create a token, including
            fake versions of existing tokens and tokens that falsely claim to
            represent projects, and acknowledge and accept the risk that you may
            mistakenly trade those or other tokens. You further acknowledge that
            the interface is not responsible for any of these variables or
            risks, does not own or control the Protocol, and cannot be held
            liable for any resulting losses that you experience while accessing
            or using the Interface. Accordingly, you understand and agree to
            assume full responsibility for all of the risks of accessing and
            using the Interface to interact with the Protocol.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Third-Party Resources and Promotions" />
          <Typography>
            The Interface may contain references or links to third-party
            resources, including (but not limited to) information, materials,
            products, or services, that it does not own or control. In addition,
            third parties may offer promotions related to your access and use of
            the Interface. The App does not endorse or assume any responsibility
            for any such resources or promotions. If you access any such
            resources or participate in any such promotions, you do so at your
            own risk, and you understand that this Agreement does not apply to
            your dealings or relationships with any third parties. You expressly
            relieve the App of any and all liability arising from your use of
            any such resources or participation in any such promotions.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Governing Law and Venue" />
          <Typography>
            These Terms and your access to and use of the Interface shall be
            governed by and construed and enforced in accordance with the laws
            of Switzerland.
          </Typography>
        </Grid>

        <Grid item>
          <SubTitle content="Entire Agreement" />
          <Typography>
            These terms constitute the entire agreement between you and us with
            respect to the subject matter hereof. This Agreement supersedes any
            and all prior or contemporaneous written and oral agreements,
            communications and other understandings (if any) relating to the
            subject matter of the terms.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
