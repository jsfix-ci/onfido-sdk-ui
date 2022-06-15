import { Project, Node } from 'ts-morph'
import path from 'path'

const useMorph = process.env.BUILD_MODE !== 'hot'
let project

const loadMorph = () => {
  project = new Project({
    tsConfigFilePath: path.join(__dirname, '../tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  })

  // TODO: exclude __tests__ & __intergrations__
  project.addSourceFilesAtPaths('src/**/*{.d.ts,.ts,.tsx,.js,.jsx}')

  // Inject line number, file & method for logging
  const loggerSourceFile = project.getSourceFile(
    path.join(__dirname, '../src/core/logging/Logger.ts')
  )

  loggerSourceFile
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

        const filePath = callExpression
          .getSourceFile()
          .getFilePath()
          .replace(path.join(__dirname, '../'), '')
        const lineNumber = callExpression.getStartLineNumber()

        const anc = callExpression.getAncestors()
        const trace = []
        anc.forEach((x) => {
          if (
            Node.isMethodDeclaration(x) ||
            Node.isFunctionDeclaration(x) ||
            Node.isClassDeclaration(x) ||
            Node.isVariableDeclaration(x) ||
            Node.isFunctionExpression(x) ||
            Node.isPropertyDeclaration(x)
          ) {
            trace.push(x.getName())
          }
        })
        const method = trace.reverse().join('.')

        callExpression.addArguments([
          `'${filePath}'`,
          `'${method}'`,
          `'${lineNumber}'`,
        ])
      })
    })
}

if (useMorph) {
  console.log('Loading Morph....')
  loadMorph()
  console.log('Morph is done loading')
}

export const appendLogging = (sourceFilePath) => {
  if (!useMorph) {
    return
  }

  const sourceFile = project.getSourceFile(sourceFilePath)

  if (!sourceFile) {
    console.log('Could not find source file', sourceFilePath)
    return
  }

  return sourceFile.getText()
}
