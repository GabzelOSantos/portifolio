import './header.scss'

export default function Header(){
    return(
        <div className="contentHeader">
            <div className='logo'><strong>&lt;/&gt; Gabzel<span>Dev</span></strong></div>
            <div className="buttons">
                <button className='btn1'>Contatos</button>
            </div>
        </div>
    );
}