import Head from "next/head";

import Page from "@/events/202501/instrEditor/Page";
import withEventReducer from "@/hoc/withEventReducer";
import { wrapper } from "@/store/rootStore";

import {
  setInstrConfig,
  setActConfig,
} from "@/events/202501/instrEditor/store/config/slice";
import reducer from "@/events/202501/instrEditor/store";
import { getJsonFromS3 } from "@/hoc/fetchConfig";
import { fetchConfigInfo } from "@/apis/fetchConfig";

const IndexPage = ({ configData, ...props }) => {
  const { title, description, keywords } = configData.metaData;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page {...props} />
    </>
  );
};

export default withEventReducer(IndexPage, {
  reducerPath: "instrEditor202501",
  reducer,
});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { res, query } = context;
    const { instrPageId } = query || {};

    let configData = {};
    let actConfig = {};

    try {
      res.setHeader(
        "Cache-Control",
        `public, s-maxage=30, stale-while-revalidate=59`
      );

      // set actConfig from s3
      actConfig = await getJsonFromS3(
        "instr-bucket",
        "config/202501/actInstrPage.json"
      );

      configData = await fetchConfigInfo({
        configUrl: "/config/events/202501/instrEditor.json",
      });

      store.dispatch(setActConfig({ actConfig: actConfig }));

      console.log("actConfig", actConfig);

      store.dispatch(setInstrConfig({ instrConfig: configData }));
    } catch (err) {
      console.log("error", err);
      return {
        props: {},
        notFound: true,
      };
    }

    return {
      props: {
        configData,
        actConfig,
        instrTabId: 4,
        fileName: "config/202501/actInstrPage.json",
      },
    };
  }
);
