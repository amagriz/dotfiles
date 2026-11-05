"use strict";var o=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var w=(a,t)=>{for(var s in t)o(a,s,{get:t[s],enumerable:!0})},u=(a,t,s,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of d(t))!p.call(a,i)&&i!==s&&o(a,i,{get:()=>t[i],enumerable:!(l=c(t,i))||l.enumerable});return a};var m=a=>u(o({},"__esModule",{value:!0}),a);var f={};w(f,{default:()=>n});module.exports=m(f);var e=require("@raycast/api"),r=require("@raycast/utils");async function y(){await(0,r.runAppleScript)(`
  tell application "Mail"
	set visible of every window to false

	set allAccounts to every account
	repeat with anAccount in allAccounts
		set allMailboxes to every mailbox of anAccount
		repeat with aMailbox in allMailboxes
			set unreadMessages to (every message of aMailbox whose read status is false)
			repeat with aMessage in unreadMessages
				set read status of aMessage to true
			end repeat
		end repeat
	end repeat

	close every window
	activate
	delay 1 -- Wait for a second to ensure Mail app is activated
	tell application "System Events" to keystroke "0" using command down -- Command-0 is the typical shortcut to open main viewer window in Mail
end tell
  `)}async function n(){await(0,e.closeMainWindow)();try{await(0,e.showToast)(e.Toast.Style.Animated,"Closing the Mail window for better performance, The window will reappear when this is done."),await y()}catch{await(0,e.showToast)(e.Toast.Style.Failure,"Failed to mark all emails as read");return}await(0,e.showToast)(e.Toast.Style.Success,"All emails marked as read")}
