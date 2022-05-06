import makeGraphQLRequest from "../utils/makeGraphQLRequest";
import GetMenuStrings from "../shared/models/GetMenuStrings";
import Menu from "../components/Menu";

// Type data
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

// API Schema
export type MenuStringData = {
  pageTitle: string;
  directory: {
    title: string;
    menuItems?: MenuItem[];
  };
  events: {
    title: string;
    menuItems?: MenuItem[];
  };
  about: {
    title: string;
    menuItems?: MenuItem[];
  };
};
// should this be moved to request models? / graphql schemas?
export type MenuItem = {
  id: number | string;
  isVisible: boolean;
  label: string;
  url: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
};

// Page component props
export type Props = {
  strings: MenuStringData;
  locale: string;
};

// Next 'context' params
export interface Params extends ParsedUrlQuery {
  locale: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const locale = context.locale!;

  try {
    const { menuPage } = await makeGraphQLRequest(locale, GetMenuStrings);
    return {
      props: {
        strings: menuPage,
        locale,
      },
    };
  } catch (error) {
    // if any errors, return 404
    return {
      notFound: true,
    };
  }
};

/* EXPORT COMPONENT */
export default Menu;
