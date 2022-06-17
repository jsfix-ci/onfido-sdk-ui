/*
  Inject origin location data into Logger methods at build time
    - filePath: string
    - method: string
    - lineNumber: string
*/
import { Node } from 'ts-morph'
import { resolve } from 'path'
import {
  abstractOriginInfo,
  getNthDecscendant,
  appendArgumentsToCallExpression,
} from './util'
import { SyntaxKind } from 'typescript'

export default (project) => {
  let count = 0

  const sourceFile = project.getSourceFile(
    resolve(__dirname, '../../src/core/Logger/index.ts')
  )

  const levels = sourceFile
    .getClass('Logger')
    .getProperty('levels')
    .getDescendantsOfKind(SyntaxKind.StringLiteral)
    .map((node) => node.getLiteralValue())

  sourceFile
    .getClass('Logger')
    .findReferencesAsNodes()
    .forEach((node, t) => {
      const variableDeclaration = node.getFirstAncestor(
        Node.isVariableDeclaration
      )

      if (!variableDeclaration) {
        return
      }

      variableDeclaration.findReferencesAsNodes().forEach((i) => {
        const callExpression = i.getFirstAncestor(Node.isCallExpression)

        // Exclude import identifiers etc
        if (!callExpression) {
          return
        }

        // Format: Logger.[method]
        const callMethodName = getNthDecscendant(
          callExpression,
          Node.isIdentifier,
          2
        ).getText()

        if (levels.indexOf(callMethodName) < 0) {
          return
        }

        const { filePath, methodName, lineNumber } = abstractOriginInfo(
          callExpression
        )

        const methodParametersLength = sourceFile
          .getClass('Logger')
          .getMethod(callMethodName)
          .getParameters().length

        count++

        appendArgumentsToCallExpression(callExpression, {
          max: methodParametersLength,
          data: [`'${filePath}'`, `'${methodName}'`, `'${lineNumber}'`],
        })
      })
    })

  console.log(`Extended ${count} Logger.* references with origin info`)
}
