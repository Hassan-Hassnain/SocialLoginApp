export const storageError: Firebase.Error[] = [
  {code: 'storage/unknown', description: 'An unknown error occurred.'},
  {
    code: 'storage/object-not-found',
    description: 'No object exists at the desired reference.',
  },
  {
    code: 'storage/bucket-not-found',
    description: 'No bucket is configured for Cloud Storage',
  },
  {
    code: 'storage/project-not-found',
    description: 'No project is configured for Cloud Storage',
  },
  {
    code: 'storage/quota-exceeded',
    description:
      "Quota on your Cloud Storage bucket has been exceeded. If you're on the no-cost tier, upgrade to a paid plan. If you're on a paid plan, reach out to Firebase support.",
  },
  {
    code: 'storage/unauthenticated',
    description: 'User is unauthenticated, please authenticate and try again.',
  },
  {
    code: 'storage/unauthorized',
    description:
      'User is not authorized to perform the desired action, check your security rules to ensure they are correct.',
  },
  {
    code: 'storage/retry-limit-exceeded',
    description:
      'The maximum time limit on an operation (upload, download, delete, etc.) has been excceded. Try uploading again.',
  },
  {
    code: 'storage/invalid-checksum',
    description:
      'File on the client does not match the checksum of the file received by the server. Try uploading again.',
  },
  {code: 'storage/canceled', description: 'User canceled the operation.'},
  {
    code: 'storage/invalid-event-name',
    description:
      'Invalid URL provided to refFromURL(). Must be of the form: gs://bucket/object or https://firebasestorage.googleapis.com/v0/b/bucket/o/object?token=<TOKEN>',
  },
  {
    code: 'storage/invalid-url',
    description:
      'The argument passed to put() must be `File`, `Blob`, or `UInt8` Array. The argument passed to putString() must be a raw, `Base64`, or `Base64URL` string.',
  },
  {
    code: 'storage/invalid-argument',
    description:
      "No bucket has been set in your config's storageBucket property.",
  },
  {
    code: 'storage/no-default-bucket',
    description:
      "No bucket has been set in your config's storageBucket property.",
  },
  {
    code: 'storage/cannot-slice-blob',
    description:
      "Commonly occurs when the local file has changed (deleted, saved again, etc.). Try uploading again after verifying that the file hasn't changed.",
  },
  {
    code: 'storage/server-file-wrong-size',
    description:
      'File on the client does not match the size of the file recieved by the server. Try uploading again.',
  },
];
