"use strict";
import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66b5c9180009ff7b82a6");

const database = new Databases(client);
