import {fireEvent, render , screen} from "@testing-library/react";
import Login,{validateEmail} from "../Login";
import userEvent from "@testing-library/user-event";

describe('Test the login component',()=>{
test('render the login form with 2 buttons',async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole('button');
    expect(buttonList).toHaveLength(2)
})

test('should failed on email validation',() => {
    const testEmail = 'nandu.com';
    expect(validateEmail(testEmail)).not.toBe(true);
})

test("email input field should accept email", () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Enter email");
    userEvent.type(email, "nandu");
    expect(email.value).not.toMatch("nandu@gmail.com");
})

test("password input should have type password",() =>{
    render(<Login/>);
    const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type","password");
})

test("should be able to reset the form",() =>{
    render(<Login/>);
    const resetBtn = screen.getByTestId("reset");
    const emailInputNode = screen.getByPlaceholderText("Enter email");
    const passwordInputNode = screen.getByPlaceholderText("Password");

    fireEvent.click(resetBtn);
    expect(emailInputNode.value).toMatch("");
    expect(passwordInputNode.value).toMatch("");
})

test("should be able to submit the form",() =>{
    render(<Login/>);
    const submitBtn = screen.getByTestId("submit");
    const emailInputNode = screen.getByPlaceholderText("Enter email");
    const passwordInputNode = screen.getByPlaceholderText("Password");

    userEvent.type(emailInputNode,"nandu@gmail.com");
    userEvent.type(passwordInputNode,"12345");

    userEvent.click(submitBtn);
   
    const userInfo = screen.getByText("nandu@gmail.com");
    expect(userInfo).toBeInTheDocument();
})

test("the submit button",()=>{
    render(<Login/>);
    const submitButton = screen.getByTestId("submit");
    expect(submitButton).toBeInTheDocument();
})


})