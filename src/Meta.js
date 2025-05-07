// components/Meta.js
import { Helmet } from "react-helmet";
import metadata from "./metaData";

const Meta = ({ path }) => {
  const meta = metadata[path] || metadata["/"]; 

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords.length > 0 && (
        <meta name="keywords" content={meta.keywords.join(", ")} />
      )}
    </Helmet>
  );
};

export default Meta;
