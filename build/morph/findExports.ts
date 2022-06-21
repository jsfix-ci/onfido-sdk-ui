// @ts-nocheck
/*
  Inject origin location data into Logger methods at build time
    - filePath: string
    - method: string
    - lineNumber: string
*/
import { Node } from 'ts-morph'
import { SyntaxKind } from 'typescript'
// import { fromBasePath } from './project'
import { abstractOriginInfo, appendArgumentsToCallExpression } from './util'

import { getProject, fromBasePath } from './project'
const project = getProject()

const log = (node, message) => {
  console.log(
    [
      node
        .getSourceFile()
        .getFilePath()
        .replace(fromBasePath(''), '')
        .replace(/^\//, ''),
      `:${node.getStartLineNumber()}`,
      ' - ',
      message,
    ].join('')
  )
}

project.getSourceFiles().forEach((sourceFile) => {
  sourceFile.getExportedDeclarations().forEach((declaration) => {
    let node = declaration[0]
    const isNamedExport = !!node.findReferencesAsNodes
    const refs = {
      all: [],
      inside: [],
      outside: [],
    }

    if (isNamedExport) {
      refs.all = node.findReferencesAsNodes()
    } else {
      // Default exports
      refs.all = project
        .getLanguageService()
        .findReferencesAsNodes(declaration[0])
    }

    refs.inside = refs.all
      .filter(
        (refNode) => !refNode.getFirstAncestorByKind(SyntaxKind.ImportClause)
      )
      .filter(
        (refNode) =>
          refNode.getSourceFile().getFilePath() === sourceFile.getFilePath()
      )
      .filter((refNode) => refNode.getText() !== node.getText())

    refs.outside = refs.all
      .filter(
        (refNode) => !refNode.getFirstAncestorByKind(SyntaxKind.ImportClause)
      )
      .filter(
        (refNode) =>
          refNode.getSourceFile().getFilePath() !== sourceFile.getFilePath()
      )
      .filter((refNode) => refNode.getText() !== node.getText())

    if (node.getKindName() === 'VariableDeclaration') {
      node = node.getFirstAncestor(Node.isVariableStatement)
    }
    

    if (isNamedExport) {
      if (refs.inside.length === 0 && refs.outside.length === 0) {
        log(node, [refs.all.length, refs.inside.length, refs.outside.length])
        log(node, "Can be removed as it isn't used anywhere")
        // node.remove()
      } else if (refs.outside.length === 0) {
        log(node, [refs.all.length, refs.inside.length, refs.outside.length])
        log(node, 'Export can be removed')
        // node.setIsExported(false)
      }
    }

    if (!isNamedExport) {
      if (refs.inside.length === 0 && refs.outside.length === 0) {
        log(node, [refs.all.length, refs.inside.length, refs.outside.length])
        log(node, "Default export can be removed as it isn't used anywhere")
        // sourceFile.removeDefaultExport()
      }
    }
  })
})
