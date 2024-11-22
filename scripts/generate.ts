import dotenv from "dotenv";
dotenv.config({path: ".env.local"})
//Configure dotenv
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import {DocumentInterface} from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getEmbeddingCollection, getVectorStore } from "../src/lib/astradb"

async function generateEmbedding() {
  const vectorStore = await getVectorStore();

  (await getEmbeddingCollection()).deleteMany({})

  const loader = new DirectoryLoader(
    "src/app/",
    {
      ".tsx": (path) => new TextLoader(path),
    },
    true,
  );

  const docs = (await loader.load()).filter(doc => doc.metadata.source.endsWith("page.tsx")).map((doc): DocumentInterface => {
    const url = doc.metadata.source.replace(/\\/g, '/').split('/src/app')[1].split('/page.')[0] || '/'

    const pageContentTrimmed = doc.pageContent
        .replace(/^import.*$/gm, "") // Remove all import statements
        .replace(/ className=(["']).*?\1| className={.*?}/g, "") // Remove all className props
        .replace(/^\s*[\r]/gm, "") // remove empty lines
        .trim();

    return {
      metadata: {url},
      pageContent: pageContentTrimmed
    }
  });

  const splitter = RecursiveCharacterTextSplitter.fromLanguage('html')

  const splitDocs = await splitter.splitDocuments(docs)

  await vectorStore.addDocuments(splitDocs)
}

generateEmbedding()