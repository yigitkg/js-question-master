interface File {
  id: string;
  name: string;
}

interface List {
  id: string;
  name: string;
  files: File[];
}

export default function move(list: List[], source: string, destination: string): List[] {
  let sourceFolder: List | undefined;
  let destinationFolder: List | undefined;
  let sourceFileIndex = 0;
  list.forEach((folder) => {
    if (folder.id === source) {
      throw new Error('You cannot move a folder');
    }
    if (folder.id === destination) {
      destinationFolder = folder;
    }
    let counter = 0;
    folder.files.forEach((file) => {
      if (file.id === destination) {
        throw new Error('You cannot specify a file as the destination');
      }
      if (file.id === source) {
        sourceFolder = folder;
        sourceFileIndex = counter;
      }
      counter += 1;
    });
    counter = 0;
  });

  if (!sourceFolder) {
    throw new Error('File not found');
  } else if (!destinationFolder) {
    throw new Error('Destination folder not found');
  } else {
    const temp = sourceFolder.files[sourceFileIndex];
    sourceFolder.files.splice(sourceFileIndex, 1);
    destinationFolder.files.push(temp);
    return list;
  }
}
