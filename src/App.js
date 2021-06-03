import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Typographic from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import { Editor, EditorState, RichUtils } from 'draft-js';
import { useState, useRef } from 'react'
import { stateToHTML } from 'draft-js-export-html'
import classes from './App.module.css'
import FormateBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import SpaceBarIcon from '@material-ui/icons/SpaceBar'
import OrderedListIcon from '@material-ui/icons/FormatListNumbered'
import UnorderedListIcon from '@material-ui/icons/FormatListBulleted'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save'
import ImageIcon from '@material-ui/icons/Image';


export default function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const editorRef = useRef(null)
  const titleRef = useRef(null);
  const blogImage=useRef(null);
  const focus = function () {

    if (editorRef) {
      editorRef.current.focus();
    }
  };
  const bold = function (ev) {
    ev.preventDefault()  //حتى يبقي الويبقى يكتب  focus;
    const newState = RichUtils.toggleInlineStyle(editorState, "BOLD")
    setEditorState(newState)
  }
  const italic = function (ev) {
    ev.preventDefault()
    const newState = RichUtils.toggleInlineStyle(editorState, "ITALIC")
    setEditorState(newState)
  }
  const code = function (ev) {
    ev.preventDefault()
    const newState = RichUtils.toggleInlineStyle(editorState, "CODE")
    setEditorState(newState)
  }
  const underline = function (ev) {
    ev.preventDefault()
    const newState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
    setEditorState(newState)
  }
  const h1 = function (ev) {
    ev.preventDefault()
    const newState = RichUtils.toggleBlockType(editorState, "header-one")
    setEditorState(newState)
  }
  const h2 = function (ev) {
    ev.preventDefault()
    const newState = RichUtils.toggleBlockType(editorState, "header-two")
    setEditorState(newState)
  }
  const h3 = function (ev) {
    ev.preventDefault()
    const newState = RichUtils.toggleBlockType(editorState, "header-three")

    setEditorState(newState)
  }
  const h4 = function (ev) {
    ev.preventDefault()
    const newState = RichUtils.toggleBlockType(editorState, "header-four")

    setEditorState(newState)
  }
  const h5 = function (ev) {
    ev.preventDefault()
    const newState = RichUtils.toggleBlockType(editorState, "header-five")
    setEditorState(newState)
  }
  const h6 = function (ev) {
    ev.preventDefault()
    const newState = RichUtils.toggleBlockType(editorState, "header-six")
    setEditorState(newState)
  }
  const ul = function (ev) {
    ev.preventDefault()
    const newState = RichUtils.toggleBlockType(editorState, "unordered-list-item")
    setEditorState(newState)
  }
  const ol = function (ev) {
    ev.preventDefault()
    const newState = RichUtils.toggleBlockType(editorState, "ordered-list-item")
    setEditorState(newState)
  }
  const handleKeyCommand = (editorState, command) => {

    const newState = RichUtils.handleKeyCommand(command, editorState)
    if (newState) {
      setEditorState(newState)
    }
  }
  const submit = async (ev) => {
    try{ev.preventDefault();
    const content = stateToHTML(editorState.getCurrentContent());
    //حتىى يصل للمحتويات به محتويات حتى اخذها للسيرفر لازم احولها الى html
    const title = titleRef.current.value;
    const data = new FormData()
    data.append('title', title)
    data.append('content', content)
    data.append('image',blogImage.current.files[0])
    const response = await fetch(`http://${process.env.REACT_APP_DOMIN}/api/blogs`, { body: data, method: "POST" })
    const json = await response.json();
    console.log(json);
  }catch(error){
    console.log(error)
  }
    

  }
  return (
    <>
      <AppBar position="static">
        <ToolBar>
          <Typographic variant="h6">
            FikraCamps Dashboard
        </Typographic>
        </ToolBar>
      </AppBar>
      <main className={classes.container}>
        <div>
          <form className={classes.blogform} onSubmit={submit}>
            <TextField label='Title' variant='outlined' className={classes.blogTitle} inputRef={titleRef}></TextField>
            <Button type="button" color='primary' variant='contained' component='label' className={classes.uploadImage}>
              <ImageIcon/>
              <input type='file' hidden ref={blogImage} />
            </Button>
            <Button type='submit' color='primary' variant='contained' >
              <SaveIcon />
            </Button>


          </form>
          <ButtonGroup color="primary" variant='contained' className={classes.EditorButtons}>
            <Button onMouseDown={h1}>H1</Button>
            <Button onMouseDown={h2}>H2</Button>

            <Button onMouseDown={h3}>H3</Button>
            <Button onMouseDown={h4}>h4</Button>
            <Button onMouseDown={h5}>H5</Button>
            <Button onMouseDown={h6}>h6</Button>
            <Button onMouseDown={bold}><FormateBoldIcon />B</Button>
            <Button onMouseDown={italic}><FormatItalicIcon /></Button>
            <Button onMouseDown={underline}><FormatUnderlinedIcon /></Button>
            <Button onMouseDown={code}><SpaceBarIcon /></Button>
            <Button onMouseDown={ol}><OrderedListIcon /></Button>
            <Button onMouseDown={ul}><UnorderedListIcon /></Button>



          </ButtonGroup>

          <div className={classes.editorContainer} onClick={focus}>
            <Editor editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={setEditorState}
              ref={editorRef}
            ></Editor>

          </div>
        </div>
      </main>

    </>
  )
}